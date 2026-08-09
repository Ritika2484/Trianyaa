"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoryNavStrip } from "@/components/CategoryNavStrip";
import { FeaturedProductsGrid } from "@/components/FeaturedProductsGrid";
import { TierSections } from "@/components/TierSections";
import { CrochetKeychainsSection } from "@/components/CrochetKeychainsSection";
import { SignaturePaletteStrip } from "@/components/SignaturePaletteStrip";
import { Testimonials } from "@/components/Testimonials";
import { TutorialsInspiration } from "@/components/TutorialsInspiration";
import { NewsletterFooter } from "@/components/NewsletterFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { ProductModal } from "@/components/ProductModal";
import { TutorialModal } from "@/components/TutorialModal";
import { Toast } from "@/components/Toast";

export default function Home() {
  return (
    <ShopProvider>
      <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#F7D6D0] selection:text-[#1E3A2B]">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Navigation Bar with Top-Left Emblem Logo */}
        <Navbar />

        {/* Hero Section with Split Layout & Flat-lay Visual */}
        <HeroSection />

        {/* 4 Circular Category Icon Buttons Strip */}
        <CategoryNavStrip />

        {/* Featured Products Grid */}
        <FeaturedProductsGrid />

        {/* Tier Sections (Basic, Standard, Premium Elevated) */}
        <TierSections />

        {/* Playful Crochet Keychains Section */}
        <CrochetKeychainsSection />

        {/* 5 Signature Palette Swatch Strip */}
        <SignaturePaletteStrip />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Tutorials & Craft Guides */}
        <TutorialsInspiration />

        {/* Dark Forest Green Newsletter & Footer */}
        <NewsletterFooter />

        {/* Slide-over Drawers & Modals */}
        <CartDrawer />
        <AuthModal />
        <ProductModal />
        <TutorialModal />
        <Toast />
      </main>
    </ShopProvider>
  );
}
