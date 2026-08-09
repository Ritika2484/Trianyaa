"use client";

import React from "react";
import { TIER_PLANS, TierPlan } from "@/data/products";
import { Check, Sparkles, Crown, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export const TierSections: React.FC = () => {
  const { showToast, setIsCartOpen } = useShop();

  const handleSelectTier = (tier: TierPlan) => {
    showToast(`Selected "${tier.name}"! Added to membership cart. ✨`);
    setIsCartOpen(true);
  };

  return (
    <section id="tiers" className="py-20 bg-gradient-to-b from-[#F9F6F0] via-[#FDFBF7] to-[#F9F6F0] relative overflow-hidden">
      {/* Soft background decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F7D6D0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#8A9A86]/20 px-3.5 py-1 rounded-full text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#D97757]" />
            Handmade Craft Memberships & Kits
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E3A2B]">
            Choose Your Craft Tier
          </h2>
          <p className="text-sm text-[#2C3531]/80 font-light max-w-xl mx-auto">
            From basic starter skeins to our master artisan monthly boxes, select the tier that fits your creative journey.
          </p>
        </div>

        {/* 3 Horizontally Arranged Pricing-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {TIER_PLANS.map((plan) => {
            const isPremium = plan.id === "tier-premium";
            const isStandard = plan.id === "tier-standard";

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPremium
                    ? "bg-[#1E3A2B] text-white shadow-2xl scale-105 border-2 border-yellow-500/50 md:-translate-y-4"
                    : "bg-white text-[#2C3531] border border-[#F4EFE6] shadow-md hover:shadow-xl"
                }`}
              >
                {/* Top Ribbon Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-block text-[11px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full shadow-xs ${plan.ribbonColor}`}
                  >
                    {plan.ribbonLabel} TAG
                  </span>

                  {isStandard && (
                    <span className="bg-[#D97757]/15 text-[#D97757] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D97757]/30">
                      Most Popular
                    </span>
                  )}

                  {isPremium && (
                    <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-yellow-400/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      VIP Gold Trim
                    </span>
                  )}
                </div>

                <div>
                  {/* Card Title & Tagline */}
                  <h3
                    className={`text-2xl font-serif font-bold ${
                      isPremium ? "text-white" : "text-[#1E3A2B]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isPremium ? "text-[#F7D6D0]" : "text-gray-500"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="my-6 py-4 border-y border-current/10">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-serif font-bold ${
                          isPremium ? "text-yellow-300" : "text-[#1E3A2B]"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-xs font-light ${
                          isPremium ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        /{plan.billingPeriod}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-2 italic font-light ${
                        isPremium ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3 mb-8">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isPremium ? "text-yellow-300" : "text-[#8A9A86]"
                      }`}
                    >
                      What&apos;s Included:
                    </p>
                    <ul className="space-y-2.5 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPremium
                                ? "text-yellow-400"
                                : "text-[#D97757]"
                            }`}
                          />
                          <span
                            className={
                              isPremium ? "text-white/90" : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Explore CTA Button */}
                <button
                  onClick={() => handleSelectTier(plan)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2 ${
                    isPremium
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A2B] hover:from-amber-300 hover:to-yellow-400 shadow-lg font-extrabold"
                      : isStandard
                      ? "bg-[#D97757] hover:bg-[#C85A3A] text-white shadow-md"
                      : "bg-[#8A9A86] hover:bg-[#788A75] text-white shadow-sm"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
