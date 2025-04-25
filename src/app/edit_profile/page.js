'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '../context/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditProfile() {
  const { getUserProfile, updateUserProfile } = useAuth();
  const user = getUserProfile(); // Pobierz dane użytkownika z kontekstu
  const [formData, setFormData] = useState({
    name: user?.name || 'Set up your profile',
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storage = getStorage();
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Generate a unique timestamp
        const uniqueFileName = `profile_pictures/${timestamp}_${file.name}`; // Append timestamp to the file name
        const storageRef = ref(storage, uniqueFileName);
        
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
  
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL)
  
        // Update the formData with the download URL
        setFormData((prev) => ({
          ...prev,
          photoURL: downloadURL,
        }));
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    const { name, photoURL } = formData;
    try {
      await updateUserProfile(name, photoURL); // Save the download URL
      console.log(getUserProfile())
  
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
        <label
          htmlFor="photoInput"
          className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          Change Photo
        </label>
        <input
          id="photoInput"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
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