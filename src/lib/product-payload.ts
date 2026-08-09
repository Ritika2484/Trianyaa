import { randomUUID } from "node:crypto";
import { Product } from "@/data/products";
import { productCategories, productTiers } from "@/models/Product";

export type ParsedProductPayload = Omit<Product, "id"> & { id: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCategory(value: unknown): value is Product["category"] {
  return typeof value === "string" && (productCategories as readonly string[]).includes(value);
}

function isTier(value: unknown): value is Product["tier"] {
  return typeof value === "string" && (productTiers as readonly string[]).includes(value);
}

export function parseProductPayload(value: unknown): ParsedProductPayload | { error: string } {
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

export function toProductDocument(product: ParsedProductPayload) {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    category: product.category,
    tier: product.tier,
    image: product.image,
    colors: product.colors,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    description: product.description,
    inStock: product.inStock,
    isNewArrival: product.isNew,
    isBestseller: product.isBestseller,
    badgeTag: product.badgeTag,
    includedItems: product.includedItems,
  };
}
