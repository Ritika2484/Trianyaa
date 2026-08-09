"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ImagePlus, PackagePlus, Trash2, X } from "lucide-react";

interface ProductForm {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: Product["category"];
  tier: Product["tier"];
  image: string;
  colors: string;
  description: string;
  badgeTag: string;
  includedItems: string;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

const emptyForm: ProductForm = {
  id: "",
  name: "",
  price: "",
  originalPrice: "",
  category: "Basic",
  tier: "Basic",
  image: "",
  colors: "#F7D6D0, #8A9A86",
  description: "",
  badgeTag: "",
  includedItems: "",
  inStock: true,
  isNew: false,
  isBestseller: false,
};

export const AdminProductManager: React.FC = () => {
  const {
    isAdmin,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    products,
    getAuthToken,
    refreshProducts,
    showToast,
  } = useShop();
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin || !isAdminPanelOpen) return null;

  const updateForm = <K extends keyof ProductForm>(field: K, value: ProductForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError(null);
    setIsUploadingImage(true);

    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Your admin session expired. Please sign in again.");

      const uploadData = new FormData();
      uploadData.append("image", file);
      const response = await fetch("/api/uploads/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
      });
      const data: { error?: string; url?: string } = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Unable to upload image.");

      updateForm("image", data.url);
      showToast("Image uploaded to Cloudinary.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Your admin session expired. Please sign in again.");

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: form.id || undefined,
          name: form.name,
          price: Number(form.price),
          originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
          category: form.category,
          tier: form.tier,
          image: form.image,
          colors: form.colors.split(",").map((color) => color.trim()).filter(Boolean),
          description: form.description,
          badgeTag: form.badgeTag,
          includedItems: form.includedItems.split(",").map((item) => item.trim()).filter(Boolean),
          inStock: form.inStock,
          isNew: form.isNew,
          isBestseller: form.isBestseller,
          rating: 0,
          reviewsCount: 0,
        }),
      });
      const data: { error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to add product.");

      await refreshProducts();
      setForm(emptyForm);
      showToast("Product added to the MongoDB catalogue.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to add product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete “${product.name}” from the catalogue?`)) return;
    setError(null);
    setDeletingId(product.id);

    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Your admin session expired. Please sign in again.");
      const response = await fetch(`/api/products/${encodeURIComponent(product.id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: { error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete product.");

      await refreshProducts();
      showToast("Product deleted from the catalogue.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsAdminPanelOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
      />
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FDFBF7] border border-[#F4EFE6] shadow-2xl p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8A9A86]/20 px-3 py-1 rounded-full text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
              <PackagePlus className="w-3.5 h-3.5 text-[#D97757]" />
              Admin catalogue
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1E3A2B] mt-3">Manage Products</h2>
            <p className="text-xs text-gray-500 mt-1">Add products to MongoDB or remove an existing catalogue entry.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAdminPanelOpen(false)}
            className="p-2 rounded-full hover:bg-[#F4EFE6] text-gray-500 hover:text-black"
            aria-label="Close product manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-2xl border border-[#F4EFE6] p-5">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="text-xs font-semibold text-[#1E3A2B]">Product ID (optional)
              <input value={form.id} onChange={(event) => updateForm("id", event.target.value)} placeholder="p-new-item" className="admin-input" />
            </label>
            <label className="text-xs font-semibold text-[#1E3A2B]">Name
              <input required value={form.name} onChange={(event) => updateForm("name", event.target.value)} className="admin-input" />
            </label>
            <label className="text-xs font-semibold text-[#1E3A2B]">Price (₹)
              <input required min="0" type="number" value={form.price} onChange={(event) => updateForm("price", event.target.value)} className="admin-input" />
            </label>
          </div>

          <label className="text-xs font-semibold text-[#1E3A2B]">Original price (₹)
            <input min="0" type="number" value={form.originalPrice} onChange={(event) => updateForm("originalPrice", event.target.value)} className="admin-input" />
          </label>
          <label className="text-xs font-semibold text-[#1E3A2B]">Display category
            <select value={form.category} onChange={(event) => updateForm("category", event.target.value as ProductForm["category"])} className="admin-input">
              <option>Basic</option><option>Standard</option><option>Premium</option><option>Keychains</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-[#1E3A2B]">Tier mode
            <select value={form.tier} onChange={(event) => updateForm("tier", event.target.value as ProductForm["tier"])} className="admin-input">
              <option>Basic</option><option>Standard</option><option>Premium</option>
            </select>
          </label>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1E3A2B]">Product image
              <span className="mt-1 flex items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1E3A2B] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#2C3531]">
                  <ImagePlus className="h-3.5 w-3.5" />
                  {isUploadingImage ? "Uploading..." : "Upload to Cloudinary"}
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={handleImageUpload} disabled={isUploadingImage || isSaving} />
                </label>
              </span>
            </label>
            <input required readOnly value={form.image} placeholder="Upload an image to generate its Cloudinary URL" className="admin-input bg-gray-50" aria-label="Cloudinary image URL" />
            <p className="text-[10px] text-gray-500">JPEG, PNG, WebP, or GIF up to 5 MB. The Cloudinary URL is saved with the product.</p>
          </div>
          <label className="text-xs font-semibold text-[#1E3A2B]">Colors (comma-separated hex)
            <input required value={form.colors} onChange={(event) => updateForm("colors", event.target.value)} className="admin-input" />
          </label>
          <label className="text-xs font-semibold text-[#1E3A2B]">Badge label
            <input value={form.badgeTag} onChange={(event) => updateForm("badgeTag", event.target.value)} placeholder="New Arrival" className="admin-input" />
          </label>
          <label className="md:col-span-2 text-xs font-semibold text-[#1E3A2B]">Description
            <textarea required rows={3} value={form.description} onChange={(event) => updateForm("description", event.target.value)} className="admin-input resize-y" />
          </label>
          <label className="md:col-span-2 text-xs font-semibold text-[#1E3A2B]">Included items (comma-separated)
            <input value={form.includedItems} onChange={(event) => updateForm("includedItems", event.target.value)} className="admin-input" />
          </label>
          <div className="md:col-span-2 flex flex-wrap gap-4 text-xs text-[#2C3531]">
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.inStock} onChange={(event) => updateForm("inStock", event.target.checked)} /> In stock</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.isNew} onChange={(event) => updateForm("isNew", event.target.checked)} /> New arrival</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.isBestseller} onChange={(event) => updateForm("isBestseller", event.target.checked)} /> Bestseller</label>
          </div>
          {error && <p className="md:col-span-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2" role="alert">{error}</p>}
          <button type="submit" disabled={isSaving || isUploadingImage} className="md:col-span-2 bg-[#D97757] hover:bg-[#C85A3A] disabled:opacity-50 text-white text-xs font-bold py-3 rounded-full transition-colors">
            {isSaving ? "Saving product..." : "Add Product to MongoDB"}
          </button>
        </form>

        <div className="mt-6 bg-white rounded-2xl border border-[#F4EFE6] overflow-hidden">
          <div className="p-4 border-b border-[#F4EFE6] flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#1E3A2B]">Current catalogue</h3>
            <span className="text-xs text-gray-500">{products.length} products</span>
          </div>
          <div className="divide-y divide-[#F4EFE6]">
            {products.map((product) => (
              <div key={product.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E3A2B] truncate">{product.name}</p>
                  <p className="text-[10px] text-gray-500">{product.id} · {product.tier} · ₹{product.price}</p>
                </div>
                <button type="button" onClick={() => void handleDelete(product)} disabled={deletingId === product.id} className="flex-shrink-0 p-2 rounded-full text-red-500 hover:bg-red-50 disabled:opacity-50" aria-label={`Delete ${product.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
