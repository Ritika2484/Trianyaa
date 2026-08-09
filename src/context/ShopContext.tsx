"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, Tutorial } from "@/data/products";
import { auth, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import confetti from "canvas-confetti";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Tutorial Modal
  activeTutorial: Tutorial | null;
  setActiveTutorial: (tutorial: Tutorial | null) => void;

  // Auth Modal & User
  user: User | null;
  isAuthLoading: boolean;
  isAdmin: boolean;
  isAdminLoading: boolean;
  adminError: string | null;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string, createAccount: boolean) => Promise<void>;
  logout: () => Promise<void>;
  getAuthToken: () => Promise<string | null>;

  // Product catalog & admin controls
  products: Product[];
  isProductsLoading: boolean;
  productError: string | null;
  refreshProducts: () => Promise<void>;

  // Coupon
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  discountAmount: number;

  // Filters & Toast
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);

  // The storefront catalog is sourced exclusively from MongoDB.
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // Coupon & Discount state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const refreshProducts = useCallback(async () => {
    setIsProductsLoading(true);
    try {
      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) {
        let errorMessage = "Unable to load products from MongoDB.";
        try {
          const data: { error?: string } = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // Keep the generic catalog error when the server returns no JSON body.
        }
        setProducts([]);
        setProductError(errorMessage);
        return;
      }
      const data: { products?: Product[] } = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
      setProductError(null);
    } catch {
      setProducts([]);
      setProductError("Unable to connect to the MongoDB product catalog.");
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    // This effect intentionally synchronizes the client catalog with the public API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshProducts();
  }, [refreshProducts]);

  useEffect(() => {
    let cancelled = false;

    const loadRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setAdminError(null);
        setIsAdminLoading(false);
        return;
      }

      setIsAdminLoading(true);
      setAdminError(null);
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data: { isAdmin?: boolean; error?: string } = await response.json();
        if (!cancelled) {
          setIsAdmin(response.ok && data.isAdmin === true);
          setAdminError(
            response.ok && data.isAdmin === true
              ? null
              : data.error || "This account is not configured as an administrator."
          );
          setIsAdminLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsAdmin(false);
          setAdminError("Unable to verify the admin session.");
          setIsAdminLoading(false);
        }
      }
    };

    void loadRole();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const getAuthToken = useCallback(async () => (user ? user.getIdToken() : null), [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === (color || product.colors[0])
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedColor: color || product.colors[0] }];
    });
    showToast(`Added "${product.name}" to cart ✨`);
    
    // Trigger festive confetti for fun craft feel
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#D97757", "#8A9A86", "#F7D6D0", "#1E3A2B"]
      });
    } catch {
      // ignore
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to your craft wishlist ❤️");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon === "TRIANYAA10" ? Math.round(subtotal * 0.1) : 0;
  const cartTotal = Math.max(0, subtotal - discountAmount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    if (code.trim().toUpperCase() === "TRIANYAA10") {
      setAppliedCoupon("TRIANYAA10");
      showToast("Coupon TRIANYAA10 applied! 10% discount added.");
      return true;
    }
    showToast("Invalid promo code. Try 'TRIANYAA10'");
    return false;
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setIsAuthOpen(false);
    showToast("Welcome back to TRIANYAA!");
  };

  const loginWithEmail = async (email: string, password: string, createAccount: boolean) => {
    if (createAccount) {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      showToast("Your TRIANYAA account is ready!");
    } else {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      showToast("Welcome back to TRIANYAA!");
    }
    setIsAuthOpen(false);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    showToast("Logged out successfully");
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct,
        activeTutorial,
        setActiveTutorial,
        user,
        isAuthLoading,
        isAdmin,
        isAdminLoading,
        adminError,
        isAuthOpen,
        setIsAuthOpen,
        loginWithGoogle,
        loginWithEmail,
        logout,
        getAuthToken,
        products,
        isProductsLoading,
        productError,
        refreshProducts,
        appliedCoupon,
        applyCoupon,
        discountAmount,
        categoryFilter,
        setCategoryFilter,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
