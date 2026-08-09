"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { X, Star, Heart, ShoppingBag, Check, Truck } from "lucide-react";

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useShop();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    quickViewProduct?.colors[0]
  );

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);
  const colorToShow = selectedColor || quickViewProduct.colors[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#FDFBF7] rounded-3xl max-w-2xl w-full overflow-hidden border border-[#F4EFE6] shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-black transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Left */}
        <div className="relative aspect-square md:aspect-auto w-full bg-[#F9F6F0]">
          <Image
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            fill
            className="object-cover"
          />
          {quickViewProduct.badgeTag && (
            <span className="absolute top-4 left-4 bg-[#1E3A2B] text-[#F7D6D0] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
              {quickViewProduct.badgeTag}
            </span>
          )}
        </div>

        {/* Product Info Right */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8A9A86] uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-gray-400 font-normal">({quickViewProduct.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#1E3A2B]">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1E3A2B]">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {quickViewProduct.description}
            </p>

            {/* Included Items list if available */}
            {quickViewProduct.includedItems && (
              <div className="space-y-1.5 pt-2">
                <p className="text-[11px] font-bold text-[#1E3A2B] uppercase">Includes:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {quickViewProduct.includedItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#D97757]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Swatch Picker */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#1E3A2B] block">
                Select Color Swatch:
              </span>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((hex) => {
                  const isSelected = colorToShow === hex;
                  return (
                    <button
                      key={hex}
                      onClick={() => setSelectedColor(hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        isSelected
                          ? "border-[#1E3A2B] scale-110 shadow-sm"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                      title={`Select swatch ${hex}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#F4EFE6] space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, colorToShow);
                  setQuickViewProduct(null);
                }}
                className="flex-1 bg-[#D97757] hover:bg-[#C85A3A] text-white font-bold text-xs py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart — ₹{quickViewProduct.price}</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3.5 rounded-full border transition-all ${
                  wishlisted
                    ? "bg-[#D97757] text-white border-[#D97757]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#D97757]"
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
              <Truck className="w-3 h-3 text-[#8A9A86]" />
              <span>Ships within 24 hours. Free delivery on orders above ₹999.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
