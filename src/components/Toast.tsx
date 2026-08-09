"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { Sparkles } from "lucide-react";

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1E3A2B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 max-w-md">
        <div className="w-7 h-7 rounded-full bg-[#D97757] flex items-center justify-center text-white flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <p className="text-xs font-semibold text-white leading-snug">
          {toastMessage}
        </p>
      </div>
    </div>
  );
};
