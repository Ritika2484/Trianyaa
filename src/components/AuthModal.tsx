"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, LogIn, Lock, Mail } from "lucide-react";
import { EmblemLogo } from "./EmblemLogo";

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, loginWithGoogle, loginWithEmail, user, logout } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthOpen) return null;

  const getAuthErrorMessage = (error: unknown) => {
    const code = typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";
    const messages: Record<string, string> = {
      "auth/email-already-in-use": "That email already has an account. Try signing in.",
      "auth/invalid-credential": "The email or password is incorrect.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Use a password with at least 6 characters.",
      "auth/popup-closed-by-user": "The sign-in window was closed before completion.",
      "auth/popup-blocked": "Your browser blocked the sign-in window. Allow popups and try again.",
    };
    return messages[code] || "Authentication failed. Check your Firebase configuration and try again.";
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password, isSignUp);
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#FDFBF7] rounded-3xl max-w-md w-full p-8 border border-[#F4EFE6] shadow-2xl z-10 space-y-6 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F4EFE6] text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <EmblemLogo size={58} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1E3A2B]">
            {user ? "Your TRIANYAA Account" : isSignUp ? "Create Craft Account" : "Welcome Back!"}
          </h3>
          <p className="text-xs text-gray-500 font-light">
            Sign in to track orders, save wishlists, and receive exclusive yarn perks.
          </p>
        </div>

        {user ? (
          <div className="bg-white p-6 rounded-2xl border border-[#F4EFE6] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F7D6D0] text-[#D97757] flex items-center justify-center mx-auto text-xl font-bold border-2 border-[#D97757]">
              {user.displayName ? user.displayName.charAt(0) : "A"}
            </div>
            <div>
              <h4 className="font-bold text-[#1E3A2B]">{user.displayName || "Craft Enthusiast"}</h4>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs py-3 rounded-full transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Sign-in button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-[#1E3A2B] text-xs font-bold py-3.5 px-4 rounded-full transition-all shadow-xs flex items-center justify-center gap-3 transform active:scale-98"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold uppercase">or email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#2C3531] focus:outline-none focus:border-[#D97757]"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#2C3531] focus:outline-none focus:border-[#D97757]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1E3A2B] hover:bg-[#D97757] text-white font-bold text-xs py-3 rounded-full transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5 text-[#F7D6D0]" />
                <span>{isSubmitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}</span>
              </button>
            </form>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2" role="alert">
                {authError}
              </p>
            )}

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setAuthError(null);
                  setIsSignUp(!isSignUp);
                }}
                className="text-xs text-[#D97757] font-semibold hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
