'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from "@/app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
  
      // Reference to the user's document in the "uzytkownicy" collection
      const userDocRef = doc(db, "uzytkownicy", user.uid);
  
      // Check if the user document already exists
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        // If the user doesn't exist, create a new document
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || '',
          surname: '', // Default value if not provided
          email: user.email || '',
          photoURL: user.photoURL || '/profile_pic.png',
          wizyty: [],
          terminy_wizyt: [],
          zamowione_czesci: [],
        });
      }
  
      router.push('/'); // Redirect to the home page
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleEmailLoginRedirect = () => {
    router.push('/login_with_email'); // Przekierowanie do komponentu login_with_email
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <p className="mb-4 text-center">Please sign in to continue.</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleLoginWithGoogle}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
        >
          Login with Google
        </button>
        <button
          onClick={handleEmailLoginRedirect}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center"
        >
          Login with Email
        </button>
      </div>
      <p className="mt-4">
        You dont have account yet?{' '}
        <a href="/register" className="text-blue-500 underline">
          Sign up here
        </a>
      </p>
    </div>
  );      
}