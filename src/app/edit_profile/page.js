'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '../context/AuthContext';

export default function EditProfile() {
  const { getUserProfile, updateUserProfile } = useAuth();
  const user = getUserProfile(); // Pobierz dane użytkownika z kontekstu
  const [formData, setFormData] = useState({
    name: user?.name || 'Set up your profile',
    email: user?.email || '',
    photoURL: user?.photoURL || '/profile_pic.png',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { name, email, photoURL } = formData;
    try {
      await updateUserProfile(name, email, photoURL);
  
      router.push('/profile');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {/* Obrazek profilowy */}
      <div className="relative w-32 h-32 mb-6 group">
        <Image
          src={formData.photoURL}
          alt="Profile"
          width={128}
          height={128}
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
        <button
          className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Change Photo
        </button>
      </div>
      {/* Formularz edycji */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Set up your username"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      </div>
      <BottomNavBar />
    </div>
  );
}