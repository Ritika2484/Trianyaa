"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Heart, Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-6 pb-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F9F6F0] to-[#FDFBF7]">
      {/* Background Decorative Soft Floral & Pattern Circles */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-[#F7D6D0]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8A9A86]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F4EFE6] border border-[#8A9A86]/30 px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D97757]" />
              <span className="text-xs font-semibold tracking-wider text-[#1E3A2B] uppercase">
                Artisanal Crochet & Yarn Boutique
              </span>
            </div>

            {/* Main Brand Tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E3A2B] leading-[1.15] tracking-tight">
              Handmade with Love, <br className="hidden sm:inline" />
              <span className="text-[#D97757] italic">One Stitch at a Time.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#2C3531]/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Curated yarns, crochet kits, and keychains to inspire your next handmade piece. 
              Discover cozy elegance made for crafters, creators, and warm-hearted gift givers.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D97757] hover:bg-[#C85A3A] text-white text-base font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-[#D97757]/20"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#keychains"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F4EFE6] hover:bg-[#F7D6D0]/60 text-[#1E3A2B] text-base font-semibold px-7 py-4 rounded-full border border-[#8A9A86]/40 transition-all hover:border-[#D97757]"
              >
                <Heart className="w-4 h-4 text-[#D97757]" />
                <span>Explore Keychains</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-8 border-t border-[#F4EFE6] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#8A9A86]/15 flex items-center justify-center text-[#1E3A2B] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#8A9A86]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E3A2B]">100% Handcrafted</h4>
                  <p className="text-[10px] text-gray-500">Ethical & Eco Yarns</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F7D6D0]/40 flex items-center justify-center text-[#D97757] flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#D97757]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E3A2B]">Express Delivery</h4>
                  <p className="text-[10px] text-gray-500">Free above ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#1E3A2B] flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-[#1E3A2B]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E3A2B]">Easy Returns</h4>
                  <p className="text-[10px] text-gray-500">14-Day Guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Flat-lay Photography & Floating Accents */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame with 16px soft rounded corners and subtle shadow */}
              <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero_flatlay.png"
                  alt="TRIANYAA Yarn Skeins, Crochet Hooks & Finished Keychain Flat-lay"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Gradient overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Pill Badge Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#F4EFE6] flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-[#F7D6D0] flex items-center justify-center text-[#D97757] font-bold text-lg">
                  🌸
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E3A2B]">Cozy Craft Studio</p>
                  <p className="text-[10px] text-[#8A9A86] font-medium">Over 5,000+ Happy Crafters</p>
                </div>
              </div>

              {/* Floating Card Bottom Left */}
              <div className="absolute -bottom-6 -left-2 sm:-left-4 bg-[#1E3A2B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D97757] flex items-center justify-center text-white text-xs font-extrabold">
                  ✨
                </div>
                <div>
                  <p className="text-xs font-serif italic text-[#F7D6D0]">&quot;Keep Creating&quot;</p>
                  <p className="text-[10px] text-white/70">New Pattern Drops Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
