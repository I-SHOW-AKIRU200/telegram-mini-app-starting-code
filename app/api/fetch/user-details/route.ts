import { db } from "@/lib/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { firebaseId } = await request.json();

    const docRef = doc(db, "users", firebaseId);

    const docSnap = await getDoc(docRef);
    let results = { ...docSnap.data() };

    return NextResponse.json({
      data: results,
      error: false,
    });
  } catch (error) {
    console.log("Error Fetch Users Details API route:", error);
    return NextResponse.json({
      data: [],
      error: true,
    });
  }
}
