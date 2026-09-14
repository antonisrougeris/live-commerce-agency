import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { parseHost } from "@/lib/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseHost(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const docRef = await adminDb.collection("hostApplications").add({
      fullName: parsed.data.name,
      email: parsed.data.email,
      countryCity: parsed.data.countryCity,
      socialUrl: parsed.data.socialUrl || null,
      languages: parsed.data.languages || null,
      preferredCategories: parsed.data.categories || null,
      about: parsed.data.about || null,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Host API error:", error);
    return NextResponse.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 }
    );
  }
}
