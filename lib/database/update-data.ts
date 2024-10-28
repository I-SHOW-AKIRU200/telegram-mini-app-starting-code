import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

export const updatePoints = async (
  newPoints: number,
  firebaseId: string | null
): Promise<boolean> => {
  if (!firebaseId) return false;

  try {
    const userDoc = doc(db, "users", firebaseId);

    await updateDoc(userDoc, {
      points: newPoints,
    });

    return true;
  } catch (error) {
    console.error("Unable to update points: ", error);
    return false;
  }
};


export const updateTasks = async (
  userId: string,
  taskId: string
): Promise<boolean> => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with the specified userId.");
      return false;
    }

    const userDoc = querySnapshot.docs[0].ref;

    await updateDoc(userDoc, {
      taskCompleted: increment(1),
      tasksCompletedIds: arrayUnion(taskId),
    });

    return true;
  } catch (error) {
    console.log("Error updating user's tasks: ", error);
    return false;
  }
};
