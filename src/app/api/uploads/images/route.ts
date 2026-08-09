import { createHash } from "node:crypto";
import { requireAdmin } from "@/lib/server-auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

type CloudinaryResponse = {
  secure_url?: string;
  error?: { message?: string };
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
  }

  return { cloudName, apiKey, apiSecret, folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "trianyaa/products" };
}

export async function POST(request: Request) {
  const authResult = await requireAdmin(request);
  if ("response" in authResult) return authResult.response;

  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json({ error: "An image file is required." }, { status: 400 });
    }
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return Response.json({ error: "Use a JPEG, PNG, WebP, or GIF image." }, { status: 400 });
    }
    if (image.size === 0 || image.size > MAX_IMAGE_SIZE) {
      return Response.json({ error: "Image size must be between 1 byte and 5 MB." }, { status: 400 });
    }

    const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.set("file", image, image.name);
    cloudinaryFormData.set("api_key", apiKey);
    cloudinaryFormData.set("timestamp", timestamp);
    cloudinaryFormData.set("folder", folder);
    cloudinaryFormData.set("signature", signature);

    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    });
    const result = (await cloudinaryResponse.json()) as CloudinaryResponse;

    if (!cloudinaryResponse.ok || !result.secure_url) {
      console.error("Cloudinary image upload failed", result.error?.message);
      return Response.json({ error: result.error?.message || "Cloudinary could not upload the image." }, { status: 502 });
    }

    return Response.json({ url: result.secure_url });
  } catch (error) {
    console.error("Image upload failed", error);
    const message = error instanceof Error ? error.message : "Unable to upload image.";
    return Response.json({ error: message }, { status: 500 });
  }
}
