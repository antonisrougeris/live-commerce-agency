import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { parseMerchant } from "@/lib/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseMerchant(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const docRef = await adminDb.collection("merchantApplications").add({
      companyName: parsed.data.company,
      contactName: parsed.data.name,
      businessEmail: parsed.data.email,
      website: parsed.data.website,
      country: parsed.data.country,
      productCategory: parsed.data.category,
      averageRetailPrice: parsed.data.price,
      availableInventory: parsed.data.inventory || null,
      productUrl: parsed.data.productUrl || null,
      targetMarkets: parsed.data.markets || null,
      notes: parsed.data.message || null,
      tiktokShopStatus: parsed.data.tiktokShop || null,
      monthlyOnlineSales: parsed.data.monthlySales || null,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Merchant API error:", error);
    return NextResponse.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 }
    );
  }
}
