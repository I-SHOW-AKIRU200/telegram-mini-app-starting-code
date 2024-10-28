import { NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/database/firebase";
import { createUserDocument } from "@/lib/database/fetch-user";

export const dynamic = "force-dynamic";

const checkUserExists = async (userId: number): Promise<boolean | string> => {
  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.id;
    }

    return false;
  } catch (error) {
    console.log(
      "checkUserExists function error in UserAuth API route: " + error
    );
    return false;
  }
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId, first_name, last_name, username } = await request.json();

    if (!userId) {
      throw new Error("UserId not specified");
    }

    // Check if the user exists in the database
    let userExists: boolean | string = await checkUserExists(userId);

    if (!userExists) {
      // Only create user document if not already present
      userExists = await createUserDocument(
        userId,
        first_name || "",
        last_name || "",
        username || ""
      );
    }

    if (!userExists) {
      throw new Error("Unable to create User Id");
    }

    return NextResponse.json({
      userExists,
      message: userExists ? "User found." : "User created.",
    });
  } catch (error) {
    console.log("User Auth API route error: " + error);
    return NextResponse.json({
      userExists: null,
      message: "An error occurred while checking user existence.",
    });
  }
}
