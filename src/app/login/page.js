'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push('/'); 
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
    </div>
  );      
}