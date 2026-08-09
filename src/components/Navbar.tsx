"use client";
/* eslint-disable @next/next/no-img-element -- Firebase provider photo URLs can come from multiple hosts. */

import React, { useState } from "react";
import Link from "next/link";
import { EmblemLogo } from "./EmblemLogo";
import { useShop } from "@/context/ShopContext";
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, LogOut, Settings } from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    user,
    isAdmin,
    setIsAdminPanelOpen,
    setIsAuthOpen,
    logout,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Shop All", href: "#products" },
    { label: "Craft Tiers", href: "#tiers" },
    { label: "Crochet Keychains", href: "#keychains" },
    { label: "Signature Palette", href: "#palette" },
    { label: "Tutorials", href: "#tutorials" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#F4EFE6] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Top Left */}
          <Link href="#hero" className="flex-shrink-0">
            <EmblemLogo size={54} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#2C3531] hover:text-[#D97757] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D97757] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Search, Wishlist, Cart & Auth Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Bar Input / Trigger */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-[#F4EFE6] rounded-full px-3 py-1.5 border border-[#8A9A86]/30 shadow-inner w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-[#8A9A86] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search yarns, keychains..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent text-xs sm:text-sm text-[#2C3531] focus:outline-none w-full"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-[#2C3531]/50 hover:text-[#2C3531] p-0.5 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-[#2C3531] hover:bg-[#F4EFE6] transition-colors relative group"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-[#2C3531] group-hover:text-[#D97757] transition-colors" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <a
              href="#products"
              className="p-2 rounded-full text-[#2C3531] hover:bg-[#F7D6D0]/40 transition-colors relative group"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 text-[#2C3531] group-hover:text-[#D97757] transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D97757] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full bg-[#1E3A2B] hover:bg-[#2C3531] text-white transition-all transform hover:scale-105 active:scale-95 shadow-sm relative flex items-center gap-2 px-3 sm:px-3.5 py-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F7D6D0]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Cart</span>
              <span className="bg-[#D97757] text-white text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </button>

            {/* Firebase Auth Account Button */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 rounded-full border border-[#8A9A86]/40 hover:bg-[#F4EFE6] transition-all">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-[#D97757]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#8A9A86] text-white font-bold text-xs flex items-center justify-center">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#F4EFE6] py-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-[#F4EFE6]">
                    <p className="text-xs font-bold text-[#1E3A2B] truncate">{user.displayName || "Craft Enthusiast"}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setIsAdminPanelOpen(true)}
                      className="w-full text-left px-4 py-2 text-xs text-[#1E3A2B] hover:bg-[#F4EFE6] flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Manage Products
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] bg-[#F4EFE6] hover:bg-[#F7D6D0]/60 px-3.5 py-2 rounded-full border border-[#8A9A86]/30 transition-all transform hover:scale-105"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#D97757]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C3531] hover:bg-[#F4EFE6] rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#F4EFE6] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-medium text-[#2C3531] hover:bg-[#F4EFE6] hover:text-[#D97757] transition-colors"
            >
              {link.label}
              </a>
            ))}
          {user && isAdmin && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminPanelOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-[#1E3A2B] bg-[#F4EFE6] py-3 rounded-full border border-[#8A9A86]/30"
            >
              <Settings className="w-4 h-4 text-[#D97757]" />
              Manage Products
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#1E3A2B] py-3 rounded-full shadow-sm"
            >
              <UserIcon className="w-4 h-4 text-[#F7D6D0]" />
              Sign In to Your Account
            </button>
          )}
        </div>
      )}
    </header>
  );
};
