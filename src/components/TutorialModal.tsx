"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { X, Clock, Heart, Share2 } from "lucide-react";

export const TutorialModal: React.FC = () => {
  const { activeTutorial, setActiveTutorial, showToast } = useShop();

  if (!activeTutorial) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Tutorial link copied to clipboard! ✂️");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setActiveTutorial(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#FDFBF7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#F4EFE6] shadow-2xl z-10 p-6 md:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setActiveTutorial(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-black transition-colors shadow-md z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
          <Image
            src={activeTutorial.image}
            alt={activeTutorial.title}
            fill
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-[#1E3A2B] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
            {activeTutorial.level}
          </span>
        </div>

        {/* Article Meta */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1 font-semibold text-[#D97757]">
              <Clock className="w-4 h-4" />
              {activeTutorial.readTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[#1E3A2B] hover:text-[#D97757] font-bold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2B]">
            {activeTutorial.title}
          </h2>

          <div className="p-4 bg-[#F4EFE6] rounded-2xl text-xs text-[#2C3531] font-medium border border-[#8A9A86]/30">
            💡 {activeTutorial.summary}
          </div>

          {/* Article Markdown Body Content */}
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4 pt-4 border-t border-[#F4EFE6]">
            {activeTutorial.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-lg font-serif font-bold text-[#1E3A2B] pt-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-xs sm:text-sm text-[#2C3531]/90 leading-relaxed font-light">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-[#F4EFE6] flex items-center justify-between">
            <p className="text-xs text-gray-500">Enjoyed this tutorial?</p>
            <button
              onClick={() => {
                showToast("Tutorial saved to your craft bookmark list ❤️");
              }}
              className="bg-[#D97757] hover:bg-[#C85A3A] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Bookmark Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
