import { randomUUID } from "node:crypto";
import { FEATURED_PRODUCTS, type Product, type ProductTier } from "@/data/products";
import { connectToDatabase } from "@/lib/mongodb";
import { serializeProduct, type ProductRecord } from "@/lib/product-serialization";
import { requireAdmin } from "@/lib/server-auth";
import { ProductModel, productCategories, productTiers } from "@/models/Product";

export const dynamic = "force-dynamic";

type ProductPayload = Omit<Product, "id"> & { id?: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCategory(value: unknown): value is Product["category"] {
  return typeof value === "string" && (productCategories as readonly string[]).includes(value);
}

function isTier(value: unknown): value is ProductTier {
  return typeof value === "string" && (productTiers as readonly string[]).includes(value);
}

function parseProductPayload(value: unknown): ProductPayload | { error: string } {
  if (!isRecord(value)) return { error: "A product object is required." };

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const image = typeof value.image === "string" ? value.image.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const colors = Array.isArray(value.colors) && value.colors.every((color) => typeof color === "string")
    ? value.colors.map((color) => color.trim().toUpperCase())
    : [];
  const includedItems = Array.isArray(value.includedItems) && value.includedItems.every((item) => typeof item === "string")
    ? value.includedItems.map((item) => item.trim()).filter(Boolean)
    : [];
  const price = typeof value.price === "number" ? value.price : Number(value.price);
  const originalPrice =
    value.originalPrice === undefined || value.originalPrice === null || value.originalPrice === ""
      ? undefined
      : typeof value.originalPrice === "number"
        ? value.originalPrice
        : Number(value.originalPrice);
  const rating = value.rating === undefined ? 0 : Number(value.rating);
  const reviewsCount = value.reviewsCount === undefined ? 0 : Number(value.reviewsCount);
  const rawId = value.id ?? value.productId;
  const id = typeof rawId === "string" && rawId.trim() ? rawId.trim() : `p-${randomUUID().slice(0, 8)}`;

  if (!name || name.length > 160) return { error: "name is required and must be 160 characters or fewer." };
  if (!Number.isFinite(price) || price < 0) return { error: "price must be a non-negative number." };
  if (originalPrice !== undefined && (!Number.isFinite(originalPrice) || originalPrice < 0)) {
    return { error: "originalPrice must be a non-negative number." };
  }
  if (!isCategory(value.category)) return { error: "category must be Basic, Standard, Premium, or Keychains." };
  if (!isTier(value.tier)) return { error: "tier must be Basic, Standard, or Premium." };
  if (!image) return { error: "image is required." };
  if (!description || description.length > 2000) return { error: "description is required and must be 2000 characters or fewer." };
  if (!colors.length || colors.some((color) => !/^#[0-9A-F]{6}$/.test(color))) {
    return { error: "colors must contain at least one six-digit hex color." };
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) return { error: "rating must be between 0 and 5." };
  if (!Number.isInteger(reviewsCount) || reviewsCount < 0) return { error: "reviewsCount must be a non-negative integer." };
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return { error: "id may contain only letters, numbers, and hyphens." };

  return {
    id,
    name,
    price,
    originalPrice,
    category: value.category,
    tier: value.tier,
    image,
    colors,
    rating,
    reviewsCount,
    description,
    inStock: value.inStock !== false,
    isNew: value.isNew === true,
    isBestseller: value.isBestseller === true,
    badgeTag: typeof value.badgeTag === "string" ? value.badgeTag.trim() || undefined : undefined,
    includedItems,
  };
}

async function seedDefaultProductsIfEmpty() {
  if (process.env.SEED_PRODUCTS_ON_EMPTY === "false") return;
  if (await ProductModel.exists({})) return;

  const seed = FEATURED_PRODUCTS.map(({ id, isNew, ...product }) => ({
    ...product,
    isNewArrival: isNew,
    productId: id,
  }));

  try {
    await ProductModel.insertMany(seed, { ordered: false });
  } catch {
    // A concurrent first request may have inserted the same seed records already.
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    await seedDefaultProductsIfEmpty();
    const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    return Response.json({ products: products.map((product) => serializeProduct(product as unknown as ProductRecord)) });
  } catch (error) {
    console.error("Product GET failed", error);
    return Response.json({ error: "Product catalog is temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdmin(request);
  if ("response" in authResult) return authResult.response;

  try {
    const parsed = parseProductPayload(await request.json());
    if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });

    await connectToDatabase();
    const product = await ProductModel.create({
      productId: parsed.id,
      name: parsed.name,
      price: parsed.price,
      originalPrice: parsed.originalPrice,
      category: parsed.category,
      tier: parsed.tier,
      image: parsed.image,
      colors: parsed.colors,
      rating: parsed.rating,
      reviewsCount: parsed.reviewsCount,
      description: parsed.description,
      inStock: parsed.inStock,
      isNewArrival: parsed.isNew,
      isBestseller: parsed.isBestseller,
      badgeTag: parsed.badgeTag,
      includedItems: parsed.includedItems,
    });

    return Response.json(
      { product: serializeProduct(product.toObject() as unknown as ProductRecord) },
      { status: 201 }
    );
  } catch (error) {
    if (isRecord(error) && error.code === 11000) {
      return Response.json({ error: "A product with this id already exists." }, { status: 409 });
    }
    console.error("Product POST failed", error);
    return Response.json({ error: "Unable to create product." }, { status: 500 });
  }
}
