import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/database/firebase";

export const createUserDocument = async (
  userId: number,
  first_name: string,
  last_name: string,
  username: string
): Promise<string | boolean> => {
  const usersCollectionRef = collection(db, "users");

  try {
    const docRef = await addDoc(usersCollectionRef, {
      userId,
      first_name,
      last_name,
      username,
      date_joined: Date.now(),
      points: 100,
      taskCompleted: 0,
      tasksCompletedIds: [],
      referredUserId: "",
      boostXG: 1,
      active: true,
    });

    return docRef.id;
  } catch (error) {
    console.log(
      "createUserDocument function error in UserAuth API route: " + error
    );
    return false;
  }
};

// Define the expected structure for your banners data
interface Banner {
  logo: string;
  link: string;
}

interface BannersResponse {
  banner_1: Banner;
  banner_2: Banner;
  banner_3: Banner;
  banner_4: Banner;
}

// Async function to fetch the banners
export const fetchBanners = async (): Promise<BannersResponse | null> => {
  try {
    const docRef = doc(db, "ads", "euaOcbm1y4wYwN28gYyP");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as BannersResponse;
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.log("Error fetching banners:", err);
    return null;
  }
};

export const fetchReferredUsersNo = async (
  userId: string | null
): Promise<number> => {
  if (!userId) return 0;

  try {
    const referrersRef = collection(db, "referrers");
    const q = query(referrersRef, where("referralId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length;
  } catch (error) {
    console.log("Error getting referral count:", error);
    return 0;
  }
};

const checkUserExists = async (userId: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    return userDoc.exists();
  } catch (error) {
    console.error("Error in checkUserExists function:", error);
    return false;
  }
};

export const updateReferralId = async (
  referralId: string,
  userId: string | null
): Promise<boolean> => {
  if (!referralId || !userId) return false;

  try {
    // First get the user's current document
    const docRef = doc(db, "users", userId);
    const userDoc = await getDoc(docRef);

    // Check if user exists and if they already have a referredUserId
    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    // If referredUserId already exists, return false
    if (userData.referredUserId) return false;

    // Check if referrer exists
    const response = await checkUserExists(referralId);
    if (!response) return false;

    // Only update if there's no existing referral
    await updateDoc(docRef, {
      referredUserId: referralId,
    });

    return true;
  } catch (error) {
    console.log("Error in Updating Referral Id", error);
    return false;
  }
};

export const fetchTopUsers = async (limitCount: number = 10) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(
      usersCollection,
      orderBy("points", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    const topUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return topUsers;
  } catch (error) {
    console.error("Error fetching top users: ", error);
    return [];
  }
};
