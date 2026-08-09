"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Tag } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const AnnouncementBar: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useShop();

  const handleCopy = () => {
    navigator.clipboard.writeText("TRIANYAA10");
    setCopied(true);
    showToast("Coupon code TRIANYAA10 copied to clipboard! ✂️");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-[#D97757] via-[#C85A3A] to-[#D97757] text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center sm:text-left">
        <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#F7D6D0] animate-pulse" />
            Special Offer
          </span>

          <span className="tracking-wide">
            Free Shipping on orders above <span className="font-bold underline decoration-[#F7D6D0]">₹499</span>
          </span>

          <span className="hidden md:inline text-white/50">•</span>

          <div className="inline-flex items-center gap-1.5">
            <span>Use code</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 bg-[#1E3A2B] hover:bg-[#2C3531] text-[#F7D6D0] px-2.5 py-0.5 rounded-full font-mono text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xs border border-[#F7D6D0]/30"
              title="Click to copy coupon code"
            >
              <Tag className="w-3 h-3 text-[#D97757]" />
              <span>TRIANYAA10</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
              ) : (
                <Copy className="w-3 h-3 text-white/70 ml-0.5" />
              )}
            </button>
            <span>for 10% off your first order</span>
          </div>
        </div>
      </div>
    </div>
  );
};
