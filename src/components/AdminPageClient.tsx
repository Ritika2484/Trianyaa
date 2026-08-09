"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useShop, ShopProvider } from "@/context/ShopContext";
import { AdminProductManager } from "@/components/AdminProductManager";
import { AuthModal } from "@/components/AuthModal";
import { EmblemLogo } from "@/components/EmblemLogo";
import { Toast } from "@/components/Toast";

function AdminWorkspace() {
  const {
    user,
    isAdmin,
    isAuthLoading,
    isAdminLoading,
    setIsAuthOpen,
    logout,
  } = useShop();

  const isLoading = isAuthLoading || (Boolean(user) && isAdminLoading);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C3531]">
      <header className="border-b border-[#F4EFE6] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-[#1E3A2B]">
            <EmblemLogo size={48} />
            <span>
              <span className="block font-serif text-xl font-bold">TRIANYAA</span>
              <span className="block text-[10px] font-semibold tracking-[0.22em] text-[#8A9A86]">ADMIN STUDIO</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#F4EFE6] px-3 py-2 text-xs font-bold text-[#1E3A2B] hover:bg-[#F4EFE6]">
              <ArrowLeft className="h-3.5 w-3.5" />
              Storefront
            </Link>
            {user && (
              <button type="button" onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2B] px-3 py-2 text-xs font-bold text-white hover:bg-[#2C3531]">
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 text-sm text-gray-500">
          Checking your admin session...
        </div>
      ) : !user ? (
        <AccessCard
          title="Admin sign-in required"
          message="Sign in with the admin Firebase account to manage the TRIANYAA catalogue."
          action={<button type="button" onClick={() => setIsAuthOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2B] px-5 py-3 text-xs font-bold text-white hover:bg-[#D97757]"><LogIn className="h-4 w-4" /> Sign in</button>}
        />
      ) : !isAdmin ? (
        <AccessCard
          title="Admin access required"
          message={`The account ${user.email ?? "currently signed in"} is not configured as an administrator.`}
          action={<Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#1E3A2B] px-5 py-3 text-xs font-bold text-white hover:bg-[#D97757]"><ArrowLeft className="h-4 w-4" /> Return to store</Link>}
        />
      ) : (
        <AdminProductManager />
      )}

      <AuthModal />
      <Toast />
    </main>
  );
}

function AccessCard({ title, message, action }: { title: string; message: string; action: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
      <div className="w-full rounded-3xl border border-[#F4EFE6] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7D6D0] text-[#D97757]"><ShieldCheck className="h-7 w-7" /></div>
        <h1 className="mt-5 font-serif text-3xl font-bold text-[#1E3A2B]">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">{message}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

export default function AdminPageClient() {
  return (
    <ShopProvider>
      <AdminWorkspace />
    </ShopProvider>
  );
}
