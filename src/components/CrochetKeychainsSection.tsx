"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingBag, Sparkles, Star, Tag, Gift, Flame, Percent } from "lucide-react";

export const CrochetKeychainsSection: React.FC = () => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct, products } = useShop();

  const [activeTag, setActiveTag] = useState<string>("All Keychains");

  // Keychains array
  const keychains = products.filter((p) => p.category === "Keychains");

  const badgeTags = [
    { label: "All Keychains", icon: Sparkles },
    { label: "New", icon: Flame },
    { label: "Bestsellers", icon: Tag },
    { label: "Gift Ideas", icon: Gift },
    { label: "Sale", icon: Percent },
  ];

  return (
    <section
      id="keychains"
      className="py-20 bg-gradient-to-br from-[#F7D6D0]/30 via-[#FDFBF7] to-[#E8F0EC]/40 relative overflow-hidden"
    >
      {/* Playful Floral & Heart SVG Background Doodles */}
      <div className="absolute top-8 left-8 text-[#D97757]/20 text-4xl animate-bounce pointer-events-none">
        🌸
      </div>
      <div className="absolute top-20 right-12 text-[#8A9A86]/30 text-3xl animate-float pointer-events-none">
        💖
      </div>
      <div className="absolute bottom-12 left-1/3 text-[#D97757]/25 text-3xl animate-pulse pointer-events-none">
        🌺
      </div>
      <div className="absolute bottom-8 right-10 text-[#8A9A86]/20 text-4xl animate-float pointer-events-none">
        ✨
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Playful Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F7D6D0] text-[#D97757] px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Playful Pocket Cuties
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E3A2B]">
            Handmade Crochet Keychains
          </h2>
          <p className="text-sm text-[#2C3531]/80 font-light">
            Bring cozy handmade magic wherever you go! Crafted with durable organic cotton yarn and rose gold findings.
          </p>

          {/* Badge-Style Filter Tags */}
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            {badgeTags.map((b) => {
              const TagIcon = b.icon;
              const isActive = activeTag === b.label;

              return (
                <button
                  key={b.label}
                  onClick={() => setActiveTag(b.label)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all transform hover:scale-105 ${
                    isActive
                      ? "bg-[#D97757] text-white shadow-md shadow-[#D97757]/30 scale-105"
                      : "bg-white text-[#1E3A2B] border border-[#F7D6D0] hover:border-[#D97757]"
                  }`}
                >
                  <TagIcon className="w-3.5 h-3.5" />
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Keychain Products on Soft Pink / Teal Backdrop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keychains.map((item, idx) => {
            const wishlisted = isWishlisted(item.id);
            // Alternate soft pink and soft teal backdrops for playful vibrancy
            const bgClass =
              idx % 2 === 0
                ? "bg-gradient-to-b from-[#F7D6D0]/40 to-white"
                : "bg-gradient-to-b from-[#8A9A86]/20 to-white";

            return (
              <div
                key={item.id}
                className={`group rounded-3xl p-4 border border-[#F4EFE6] shadow-sm hover:shadow-xl transition-all duration-300 ${bgClass} flex flex-col justify-between`}
              >
                <div>
                  {/* Square Image Box */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#D97757] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.badgeTag || "Cute Charm"}
                    </span>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                        wishlisted
                          ? "bg-[#D97757] text-white"
                          : "bg-white/80 hover:bg-white text-[#2C3531]"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlisted ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Keychain Details */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-500 font-bold">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-normal">
                        {item.reviewsCount} reviews
                      </span>
                    </div>

                    <h3
                      onClick={() => setQuickViewProduct(item)}
                      className="font-serif text-base font-bold text-[#1E3A2B] hover:text-[#D97757] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-3">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Price</span>
                    <span className="text-lg font-bold text-[#1E3A2B]">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#1E3A2B] hover:bg-[#D97757] text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xs flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F7D6D0]" />
                    <span>Adopt</span>
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
