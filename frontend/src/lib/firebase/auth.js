import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(userCredential.user, {
        displayName: name,
    });

    return userCredential.user;
};

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredential.user;
};

export const logout = () => signOut(auth);