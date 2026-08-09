import { connectToDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/server-auth";
import { ProductModel } from "@/models/Product";

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
