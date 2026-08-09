"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";

export const FeaturedProductsGrid: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
    categoryFilter,
    setCategoryFilter,
    products,
  } = useShop();

  const filteredProducts =
    categoryFilter === "All"
      ? products
      : categoryFilter === "Keychains"
        ? products.filter((p) => p.category === "Keychains")
        : products.filter((p) => p.category === categoryFilter);

  const categories = ["All", "Basic", "Standard", "Premium", "Keychains"];

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#F7D6D0]/50 px-3.5 py-1 rounded-full text-xs font-bold text-[#D97757] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Craft Creations
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2B]">
            Featured Yarns & Handcrafted Goods
          </h2>
          <p className="text-sm text-[#2C3531]/75 font-light">
            Each item is lovingly handmade or carefully selected to give your craft projects maximum warmth and joy.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  categoryFilter === cat
                    ? "bg-[#1E3A2B] text-white shadow-sm"
                    : "bg-[#F4EFE6] text-[#2C3531] hover:bg-[#F7D6D0]/50"
                }`}
              >
                {cat === "All" ? "All Creations" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#F4EFE6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Square Image Container */}
                  <div className="relative aspect-square w-full bg-[#F9F6F0] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Top Left */}
                    {product.badgeTag && (
                      <span className="absolute top-3 left-3 bg-[#1E3A2B] text-[#F7D6D0] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                        {product.badgeTag}
                      </span>
                    )}

                    {/* Heart/Wishlist Button Top Right */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all transform hover:scale-110 active:scale-95 ${
                        wishlisted
                          ? "bg-[#D97757] text-white"
                          : "bg-white/80 hover:bg-white text-[#2C3531]"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlisted ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    {/* Quick View Hover Button Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-white/95 hover:bg-white text-[#1E3A2B] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4 text-[#D97757]" />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Card Body Info */}
                  <div className="p-5 space-y-3">
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-[#1E3A2B]">
                          {product.rating}
                        </span>
                        <span className="text-gray-400">
                          ({product.reviewsCount})
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#8A9A86]">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif text-lg font-bold text-[#1E3A2B] hover:text-[#D97757] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Description Snippet */}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color-Dot Swatches */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-gray-400 font-medium mr-1">
                        Colors:
                      </span>
                      {product.colors.map((colorHex, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-2xs"
                          style={{ backgroundColor: colorHex }}
                          title={`Color swatch ${colorHex}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Add to Cart */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F4EFE6]/60 mt-2">
                  <div>
                    <span className="text-xs text-gray-400 block font-light">
                      Starting at
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#1E3A2B]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#D97757] hover:bg-[#C85A3A] text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
