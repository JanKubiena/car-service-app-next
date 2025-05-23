'use client';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Register() {
  const { signUpWithEmail } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Sign up the user with email and password
      const userCredential = await signUpWithEmail(formData.email, formData.password);
      const user = userCredential.user;
  
      // Add a new document to the "uzytkownicy" collection
      await addDoc(collection(db, "uzytkownicy"), {
        uid: user.uid, 
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        photoURL: "/profile_pic.png",
        wizyty: [],
        terminy_wizyt: [],
        zamowione_czesci: [],
      });
  
      router.push("/"); // Redirect to the home page after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 underline">
          Log in here
        </a>
      </p>
    </div>
  );
}