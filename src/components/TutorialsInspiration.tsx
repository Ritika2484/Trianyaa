"use client";

import React from "react";
import Image from "next/image";
import { TUTORIALS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const TutorialsInspiration: React.FC = () => {
  const { setActiveTutorial } = useShop();

  return (
    <section id="tutorials" className="py-20 bg-[#F9F6F0] border-t border-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#8A9A86]/20 px-3.5 py-1 rounded-full text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#D97757]" />
            Free Craft Guides & Inspiration
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2B]">
            Learn, Stitch & Create
          </h2>
          <p className="text-sm text-[#2C3531]/75 font-light">
            Step-by-step guides crafted for absolute beginners and seasoned handmade enthusiasts.
          </p>
        </div>

        {/* 3-Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TUTORIALS.map((tut) => (
            <div
              key={tut.id}
              onClick={() => setActiveTutorial(tut)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#F4EFE6] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full bg-[#F4EFE6] overflow-hidden">
                  <Image
                    src={tut.image}
                    alt={tut.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#1E3A2B] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                    {tut.level}
                  </span>
                </div>

                {/* Body Text */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-[#D97757]" />
                    <span>{tut.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1E3A2B] group-hover:text-[#D97757] transition-colors leading-snug">
                    {tut.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {tut.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[#F4EFE6]">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97757] group-hover:text-[#1E3A2B] transition-colors">
                  <span>Read Full Tutorial</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
