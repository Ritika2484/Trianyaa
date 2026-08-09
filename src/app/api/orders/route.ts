import { randomUUID } from "node:crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { authenticateRequest } from "@/lib/server-auth";
import { OrderModel } from "@/models/Order";
import { ProductModel } from "@/models/Product";

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;

type OrderItemInput = {
  productId: string;
  quantity: number;
  selectedColor?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseItems(value: unknown): OrderItemInput[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 100) return null;

  const items: OrderItemInput[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.productId !== "string") return null;
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
    const selectedColor = typeof item.selectedColor === "string" ? item.selectedColor : undefined;
    items.push({ productId: item.productId, quantity, selectedColor });
  }
  return items;
}

export async function POST(request: Request) {
  const authResult = await authenticateRequest(request);
  if ("response" in authResult) return authResult.response;

  try {
    const body = await request.json();
    if (!isRecord(body)) return Response.json({ error: "Order payload is required." }, { status: 400 });

    const items = parseItems(body.items);
    if (!items) return Response.json({ error: "Order items are invalid." }, { status: 400 });

    await connectToDatabase();
    const productIds = [...new Set(items.map((item) => item.productId))];
    const products = await ProductModel.find({ productId: { $in: productIds } }).lean();
    const productMap = new Map(products.map((product) => [product.productId, product]));

    const lineItems = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) return Response.json({ error: `Product ${item.productId} was not found.` }, { status: 400 });
      if (!product.inStock) return Response.json({ error: `${product.name} is out of stock.` }, { status: 409 });
      if (item.selectedColor && !product.colors.includes(item.selectedColor)) {
        return Response.json({ error: `Selected color is not available for ${product.name}.` }, { status: 400 });
      }

      lineItems.push({
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
      });
    }

    const subtotal = lineItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const coupon = typeof body.coupon === "string" && body.coupon.trim().toUpperCase() === "TRIANYAA10"
      ? "TRIANYAA10"
      : undefined;
    const discountAmount = coupon ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = Math.max(0, subtotal - discountAmount) + shipping;
    const order = await OrderModel.create({
      orderId: `order-${Date.now()}-${randomUUID().slice(0, 8)}`,
      userId: authResult.uid,
      customerEmail: authResult.email ?? undefined,
      items: lineItems,
      subtotal,
      discountAmount,
      shipping,
      total,
      coupon,
      status: "placed",
    });

    return Response.json({
      orderId: order.orderId,
      total,
      status: order.status,
    }, { status: 201 });
  } catch (error) {
    console.error("Order POST failed", error);
    return Response.json({ error: "Unable to place order." }, { status: 500 });
  }
}
