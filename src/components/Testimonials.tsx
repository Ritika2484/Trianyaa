"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/products";
import { Star, Quote, Heart, CheckCircle2 } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#F7D6D0]/40 text-[#D97757] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Maker Community Love
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2B]">
            What Our Craft Lovers Say
          </h2>
          <p className="text-sm text-[#2C3531]/75 font-light">
            Real reviews from yarn enthusiasts, crocheters, and gift givers across India.
          </p>
        </div>

        {/* 3 Customer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-[#F4EFE6] shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#F7D6D0]/60 group-hover:text-[#D97757]/30 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#2C3531]/90 italic font-serif leading-relaxed mb-6">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Customer Photo & Bio */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#F4EFE6]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D97757] shadow-sm flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-[#1E3A2B]">{t.name}</h4>
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86]" />
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{t.location}</p>
                  <p className="text-[10px] font-semibold text-[#D97757] mt-0.5">{t.purchasedItem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
