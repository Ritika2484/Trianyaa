import { Schema, model, models, type InferSchemaType } from "mongoose";

export const productCategories = ["Basic", "Standard", "Premium", "Keychains"] as const;
export const productTiers = ["Basic", "Standard", "Premium"] as const;

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9-]+$/,
    },
    name: { type: String, required: true, trim: true, maxlength: 160 },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: { type: String, required: true, enum: productCategories },
    tier: { type: String, required: true, enum: productTiers },
    image: { type: String, required: true, trim: true },
    colors: {
      type: [String],
      required: true,
      validate: {
        validator: (colors: string[]) =>
          colors.length > 0 && colors.every((color) => /^#[0-9A-Fa-f]{6}$/.test(color)),
        message: "colors must contain at least one six-digit hex color",
      },
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    inStock: { type: Boolean, default: true },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    badgeTag: { type: String, trim: true, maxlength: 50 },
    includedItems: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index({ tier: 1, category: 1 });
productSchema.index({ createdAt: -1 });

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const ProductModel = models.Product || model("Product", productSchema);
