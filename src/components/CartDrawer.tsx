"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import confetti from "canvas-confetti";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    showToast,
    user,
    getAuthToken,
    setIsAuthOpen,
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon("");
    }
  };

  const handleSimulateCheckout = async () => {
    if (!user) {
      setIsAuthOpen(true);
      showToast("Please sign in before placing an order.");
      return;
    }

    setIsCheckingOut(true);
    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Your session expired. Please sign in again.");

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coupon: appliedCoupon,
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            selectedColor: item.selectedColor,
          })),
        }),
      });
      const data: { orderId?: string; error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to place order.");

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D97757", "#8A9A86", "#F7D6D0", "#1E3A2B", "#FFD700"]
      });
      clearCart();
      setIsCartOpen(false);
      showToast(`Order ${data.orderId || "placed"} successfully! Thank you for supporting handmade craft! 🌸`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to place order.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col justify-between border-l border-[#F4EFE6] animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#F4EFE6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D97757]" />
              <h2 className="text-xl font-serif font-bold text-[#1E3A2B]">
                Your Craft Basket
              </h2>
              <span className="bg-[#F7D6D0] text-[#D97757] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#F4EFE6] text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F9F6F0] p-4 border-b border-[#F4EFE6]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1 text-[#1E3A2B]">
                <Truck className="w-4 h-4 text-[#D97757]" />
                {amountNeededForFreeShipping > 0 ? (
                  <>Add <strong className="text-[#D97757]">₹{amountNeededForFreeShipping}</strong> more for FREE Shipping!</>
                ) : (
                  <span className="text-emerald-700 font-bold">🎉 You&apos;ve unlocked FREE Shipping!</span>
                )}
              </span>
              <span className="text-gray-500">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-[#F4EFE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D97757] to-[#8A9A86] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F7D6D0]/40 text-[#D97757] flex items-center justify-center mx-auto text-2xl">
                  🧶
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E3A2B]">
                  Your basket is empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our cozy yarns and keychains to start your next handmade project!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#D97757] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[#C85A3A] transition-all"
                >
                  Start Crafting
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#F4EFE6] shadow-xs relative group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F9F6F0] flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-[#1E3A2B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span className="text-[10px] text-gray-400 font-mono">
                            {item.selectedColor}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-[#1E3A2B]">
                        ₹{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-full bg-[#F9F6F0]">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F4EFE6] bg-white space-y-4">
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. TRIANYAA10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full bg-[#F4EFE6] border border-gray-200 rounded-full pl-9 pr-3 py-2 text-xs uppercase focus:outline-none focus:border-[#D97757]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1E3A2B] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#D97757] transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{subtotal}</span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {amountNeededForFreeShipping <= 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      "₹79"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1E3A2B] pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#D97757]">
                    ₹{cartTotal + (amountNeededForFreeShipping <= 0 ? 0 : 79)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#D97757] hover:bg-[#C85A3A] text-white font-bold text-sm py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Your Order... 🌸</span>
                ) : (
                  <>
                    <span>{user ? "Proceed to Checkout" : "Sign in to Checkout"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
