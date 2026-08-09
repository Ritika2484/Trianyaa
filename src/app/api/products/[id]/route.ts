import { connectToDatabase } from "@/lib/mongodb";
import { parseProductPayload, toProductDocument } from "@/lib/product-payload";
import { serializeProduct, type ProductRecord } from "@/lib/product-serialization";
import { requireAdmin } from "@/lib/server-auth";
import { ProductModel } from "@/models/Product";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin(request);
  if ("response" in authResult) return authResult.response;

  const { id } = await params;
  if (!id) return Response.json({ error: "Product id is required." }, { status: 400 });

  try {
    const parsed = parseProductPayload(await request.json());
    if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
    if (parsed.id !== id) return Response.json({ error: "Product id cannot be changed." }, { status: 400 });

    await connectToDatabase();
    const document = toProductDocument(parsed);
    const { originalPrice, badgeTag, ...requiredFields } = document;
    const product = await ProductModel.findOneAndUpdate(
      { productId: id },
      {
        $set: {
          ...requiredFields,
          ...(originalPrice === undefined ? {} : { originalPrice }),
          ...(badgeTag === undefined ? {} : { badgeTag }),
        },
        $unset: {
          ...(originalPrice === undefined ? { originalPrice: 1 } : {}),
          ...(badgeTag === undefined ? { badgeTag: 1 } : {}),
        },
      },
      { new: true, runValidators: true }
    );
    if (!product) return Response.json({ error: "Product not found." }, { status: 404 });

    return Response.json({ product: serializeProduct(product.toObject() as unknown as ProductRecord) });
  } catch (error) {
    console.error("Product PUT failed", error);
    return Response.json({ error: "Unable to update product." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin(request);
  if ("response" in authResult) return authResult.response;

  const { id } = await params;
  if (!id) return Response.json({ error: "Product id is required." }, { status: 400 });

  try {
    await connectToDatabase();
    const deletedProduct = await ProductModel.findOneAndDelete({ productId: id });
    if (!deletedProduct) return Response.json({ error: "Product not found." }, { status: 404 });
    return Response.json({ deleted: true, id });
  } catch (error) {
    console.error("Product DELETE failed", error);
    return Response.json({ error: "Unable to delete product." }, { status: 500 });
  }
}
