"use client";

import React, { useState } from "react";
import { EmblemLogo } from "./EmblemLogo";
import { useShop } from "@/context/ShopContext";
import { Mail, Send, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export const NewsletterFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address 💌");
      return;
    }
    setSubscribed(true);
    showToast("Welcome to the TRIANYAA Craft Family! 🌸 Your 10% coupon code is TRIANYAA10");
  };

  return (
    <footer className="bg-[#1E3A2B] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-[#8A9A86]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dark Sage Newsletter Banner */}
        <div className="bg-gradient-to-r from-[#2C3531] via-[#1E3A2B] to-[#2C3531] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl mb-16 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-[#D97757] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Stay Connected
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Let&apos;s Stay in Touch
          </h2>

          <p className="text-sm sm:text-base text-[#F7D6D0]/90 font-light max-w-lg mx-auto">
            Subscribe for free weekly crochet patterns, exclusive yarn drops, and a <span className="font-bold text-yellow-300">10% discount code</span> for your first craft order.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-400 text-emerald-200 px-6 py-3 rounded-full text-sm font-semibold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You&apos;re subscribed! Use code <strong className="text-yellow-300">TRIANYAA10</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="w-5 h-5 text-[#8A9A86] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/30 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#D97757] hover:bg-[#C85A3A] text-white text-sm font-bold px-8 py-3.5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Join</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#FDFBF7] p-2 rounded-2xl inline-block">
              <EmblemLogo size={46} />
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed font-light">
              TRIANYAA is an independent handmade crochet & yarn craft brand dedicated to bringing cozy elegance, warm minimal aesthetics, and playful handmade joy to your everyday space.
            </p>
            {/* Social Icons (Clean Inline SVGs) */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D97757] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D97757] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D97757] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300">Shop</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#products" className="hover:text-[#F7D6D0] transition-colors">Beginner Kits</a></li>
              <li><a href="#products" className="hover:text-[#F7D6D0] transition-colors">Organic Yarns</a></li>
              <li><a href="#keychains" className="hover:text-[#F7D6D0] transition-colors">Crochet Keychains</a></li>
              <li><a href="#tiers" className="hover:text-[#F7D6D0] transition-colors">Monthly Box Tiers</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300">Customer Care</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#" className="hover:text-[#F7D6D0] transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#F7D6D0] transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-[#F7D6D0] transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-[#F7D6D0] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Brand & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-300">Craft Studio</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              📍 Handcrafted Studio, Sector 4, New Delhi, India<br />
              ✉️ hello@trianyaa.crafts<br />
              📞 +91 (0) 98765 43210
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} TRIANYAA Crafts. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-[#D97757] fill-current" />
            <span>for crafters worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
