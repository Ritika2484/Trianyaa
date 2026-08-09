"use client";

import React, { useState } from "react";
import { Palette, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const SignaturePaletteStrip: React.FC = () => {
  const { showToast } = useShop();

  const paletteColors = [
    {
      name: "Warm Oat",
      hex: "#F4EFE6",
      border: "border-gray-300",
      textColor: "text-[#2C3531]",
      description: "Cozy cream neutral inspired by raw unbleached linen and morning oats.",
      bestPair: "Pairs perfectly with Terracotta & Sage",
    },
    {
      name: "Blush Pink",
      hex: "#F7D6D0",
      border: "border-[#F7D6D0]",
      textColor: "text-[#2C3531]",
      description: "Soft playful rose tint reflecting delicate spring botanical blossoms.",
      bestPair: "Pairs beautifully with Oat & Charcoal",
    },
    {
      name: "Terracotta",
      hex: "#D97757",
      border: "border-[#D97757]",
      textColor: "text-white",
      description: "Rich sun-baked clay tone bringing warmth and grounding craft energy.",
      bestPair: "Pairs triumphantly with Sage & Oat",
    },
    {
      name: "Sage Green",
      hex: "#8A9A86",
      border: "border-[#8A9A86]",
      textColor: "text-white",
      description: "Calming muted herb green representing organic eucalyptus leaves.",
      bestPair: "Pairs naturally with Terracotta & Blush",
    },
    {
      name: "Charcoal",
      hex: "#2C3531",
      border: "border-[#2C3531]",
      textColor: "text-white",
      description: "Deep earthy dark accent for contrast borders and detailed stitchwork.",
      bestPair: "Pairs crisp with Blush & Oat",
    },
  ];

  const [selectedColor, setSelectedColor] = useState(paletteColors[2]); // Default Terracotta

  return (
    <section id="palette" className="py-16 bg-[#1E3A2B] text-white relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97757]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8A9A86]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F7D6D0]/20 text-[#F7D6D0] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            Curated Color Story
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Our Signature Palette
          </h2>
          <p className="text-sm sm:text-base text-[#F7D6D0]/90 font-light italic">
            &quot;Colors inspired by nature, made to mix and match.&quot;
          </p>
        </div>

        {/* 5 Swatches Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto mb-10">
          {paletteColors.map((item) => {
            const isSelected = selectedColor.name === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedColor(item);
                  showToast(`Selected swatch: ${item.name} (${item.hex}) 🎨`);
                }}
                className={`group rounded-2xl p-4 transition-all duration-300 transform hover:-translate-y-1 text-center border flex flex-col items-center justify-between ${
                  isSelected
                    ? "bg-white/15 border-yellow-400/80 shadow-xl scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {/* Large Color Circle */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg transition-transform group-hover:scale-105 border-2 border-white/40 flex items-center justify-center relative"
                  style={{ backgroundColor: item.hex }}
                >
                  {isSelected && (
                    <span className="bg-black/30 p-1.5 rounded-full text-white backdrop-blur-xs">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] font-mono text-[#F7D6D0]/70 mt-0.5">
                    {item.hex}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Swatch Description Card */}
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/50"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <h3 className="text-lg font-serif font-bold text-yellow-300">
              {selectedColor.name} ({selectedColor.hex})
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
            {selectedColor.description}
          </p>
          <div className="pt-2">
            <span className="inline-block bg-[#D97757] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
              {selectedColor.bestPair}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
