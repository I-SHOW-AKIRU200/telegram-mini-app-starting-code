import { db } from "@/lib/database/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {}
