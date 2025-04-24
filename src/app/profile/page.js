'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { getUserProfile } = useAuth();
  const user = getUserProfile(); // Pobierz dane użytkownika z kontekstu

  const router = useRouter();

  const handleEditRedirect = () => {
    router.push('/edit_profile'); // Przekierowanie do strony edycji profilu
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {/* Profil użytkownika */}
      <div className="relative w-32 h-32 mb-6">
        <Image
            src={user?.photoURL ? user.photoURL : '/profile_pic.png'}
            alt="Profile"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={handleEditRedirect}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
        <BottomNavBar />
      </div>
    </div>
  );
}