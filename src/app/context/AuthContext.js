'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const getUserProfile = useCallback(async () => {
    if (!user) return "brak użytkownika";
  
    try {
      const usersRef = collection(db, "uzytkownicy");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        return "brak użytkownika";
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return "błąd podczas pobierania danych użytkownika";
    }
  }, [user]); // Dependency on user

  const updateUserProfile = async (name, surname, photoURL) => {
    if (!user) return "brak użytkownika";
  
    try {
      const usersRef = collection(db, "uzytkownicy");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref; // Get the document reference
        await updateDoc(docRef, { name, surname, photoURL }); // Use updateDoc to update the document
        return "Profil zaktualizowany pomyślnie";
      } else {
        return "błąd podczas aktualizacji profilu";
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      return "błąd podczas aktualizacji profilu";
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signUpWithEmail, signInWithEmail, logOut, getUserProfile, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}