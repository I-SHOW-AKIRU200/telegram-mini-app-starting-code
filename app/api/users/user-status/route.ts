import { NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/database/firebase";
import { createUserDocument } from "@/lib/database/fetch-user";

export const dynamic = "force-dynamic";

const checkUserExists = async (userId: number): Promise<boolean | string> => {};

export async function POST(request: Request): Promise<NextResponse> {}
