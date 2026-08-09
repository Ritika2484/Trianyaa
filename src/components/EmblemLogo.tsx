"use client";

import React from "react";
import Image from "next/image";

interface EmblemLogoProps {
  size?: number;
  className?: string;
}

export const EmblemLogo: React.FC<EmblemLogoProps> = ({ size = 52, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Emblem Circular Badge */}
      <div
        className="relative rounded-full overflow-hidden shadow-sm border border-[#1E3A2B]/20 bg-[#FDFBF7] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo_emblem.png"
          alt="TRIANYAA Emblem Logo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Brand Text Header */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1E3A2B] leading-none">
            TRIANYAA
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F7D6D0] text-[#D97757]">
            Crafts
          </span>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A9A86] font-medium mt-0.5">
          Handmade & Yarn Creation
        </span>
      </div>
    </div>
  );
};
