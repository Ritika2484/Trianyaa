import type { Product, ProductTier } from "@/data/products";

export type ProductRecord = {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Product["category"];
  tier: ProductTier;
  image: string;
  colors: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  inStock: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  badgeTag?: string;
  includedItems?: string[];
};

export function serializeProduct(product: ProductRecord): Product {
  return {
    id: product.productId,
    name: product.name,
    price: product.price,
    ...(product.originalPrice === undefined ? {} : { originalPrice: product.originalPrice }),
    category: product.category,
    tier: product.tier,
    image: product.image,
    colors: product.colors,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    description: product.description,
    inStock: product.inStock,
    ...(product.isNewArrival ? { isNew: true } : {}),
    ...(product.isBestseller ? { isBestseller: true } : {}),
    ...(product.badgeTag ? { badgeTag: product.badgeTag } : {}),
    ...(product.includedItems?.length ? { includedItems: product.includedItems } : {}),
  };
}
