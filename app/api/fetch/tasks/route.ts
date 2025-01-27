import { db } from "@/lib/database/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {}
