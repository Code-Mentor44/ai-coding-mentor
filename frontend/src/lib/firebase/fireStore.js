import {
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const createUserDocument = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,

        streak: 0,
        mastery: 0,
        problemsSolved: 0,

        createdAt: new Date().toISOString(),
    });
};

export const getUserDocument = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null;
};