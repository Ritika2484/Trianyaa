import { FEATURED_PRODUCTS } from "@/data/products";
import { connectToDatabase } from "@/lib/mongodb";
import { serializeProduct, type ProductRecord } from "@/lib/product-serialization";
import { parseProductPayload, toProductDocument } from "@/lib/product-payload";
import { requireAdmin } from "@/lib/server-auth";
import { ProductModel } from "@/models/Product";

export const dynamic = "force-dynamic";

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
    const product = await ProductModel.create(toProductDocument(parsed));

    return Response.json(
      { product: serializeProduct(product.toObject() as unknown as ProductRecord) },
      { status: 201 }
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return Response.json({ error: "A product with this id already exists." }, { status: 409 });
    }
    console.error("Product POST failed", error);
    return Response.json({ error: "Unable to create product." }, { status: 500 });
  }
}
