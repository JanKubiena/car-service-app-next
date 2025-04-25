'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, EmailAuthProvider, reauthenticateWithCredential  } from 'firebase/auth';
import { auth } from '../firebase';

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

  const getUserProfile = () => {
    return user ? { name: user.displayName, email: user.email, photoURL: user.photoURL } : "brak użytkownika";
  };

  const updateUserProfile = async (name, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || '/profile_pic.png',
      });
  
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error; // Re-throw the error to handle it in the calling component
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