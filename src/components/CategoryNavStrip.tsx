"use client";

import React from "react";
import { Disc, Gift, Crown, Key, ArrowUpRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const CategoryNavStrip: React.FC = () => {
  const { categoryFilter, setCategoryFilter } = useShop();

  const categories = [
    {
      id: "Basic",
      label: "Basic Kits",
      subtitle: "Beginner Essentials",
      icon: Disc,
      color: "bg-[#8A9A86]/20 text-[#1E3A2B] group-hover:bg-[#8A9A86] group-hover:text-white",
      badge: "Sage",
    },
    {
      id: "Standard",
      label: "Standard Box",
      subtitle: "Monthly Discovery",
      icon: Gift,
      color: "bg-[#F7D6D0] text-[#D97757] group-hover:bg-[#D97757] group-hover:text-white",
      badge: "Terracotta",
    },
    {
      id: "Premium",
      label: "Premium Suite",
      subtitle: "Master Collection",
      icon: Crown,
      color: "bg-[#1E3A2B]/15 text-[#1E3A2B] group-hover:bg-[#1E3A2B] group-hover:text-[#F7D6D0]",
      badge: "Forest Gold",
    },
    {
      id: "Keychains",
      label: "Crochet Keychains",
      subtitle: "Handmade Charms",
      icon: Key,
      color: "bg-[#D97757]/20 text-[#D97757] group-hover:bg-[#D97757] group-hover:text-white",
      badge: "Playful",
    },
  ];

  return (
    <section className="py-12 bg-[#FDFBF7] border-y border-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
                EXPLORE CATEGORIES
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#8A9A86]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2B]">
              Craft Collections & Tier Supplies
            </h2>
          </div>

          <button
            onClick={() => setCategoryFilter("All")}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#D97757] hover:text-[#1E3A2B] transition-colors group"
          >
            <span>Shop All Products</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Circular Category Icon Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = categoryFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryFilter(cat.id);
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group text-left p-5 rounded-2xl border transition-all transform hover:-translate-y-1 ${
                  isSelected
                    ? "bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-lg scale-102"
                    : "bg-[#F9F6F0] hover:bg-white text-[#2C3531] border-[#F4EFE6] hover:border-[#D97757]/40 shadow-xs hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Circular Icon Button */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected ? "bg-[#D97757] text-white" : cat.color
                    }`}
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-[#F7D6D0]"
                        : "bg-[#F4EFE6] text-[#8A9A86]"
                    }`}
                  >
                    {cat.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <h3
                    className={`text-lg font-serif font-bold ${
                      isSelected ? "text-white" : "text-[#1E3A2B]"
                    }`}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 ${
                      isSelected ? "text-[#F7D6D0]" : "text-gray-500"
                    }`}
                  >
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#D97757]">
                  <span>{isSelected ? "Active Filter" : "Shop Collection"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Shop All link */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={() => setCategoryFilter("All")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#D97757]"
          >
            <span>Shop All Products</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
