import { db } from "@/lib/database/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef);
    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return NextResponse.json({
      data: results,
      error: false,
    });
  } catch (error) {
    console.log("Error Fetch tasks API route:", error);
    return NextResponse.json({
      data: [],
      error: true,
    });
  }
}
