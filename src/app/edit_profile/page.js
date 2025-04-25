'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '../context/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditProfile() {
  const router = useRouter();
  const { getUserProfile, updateUserProfile } = useAuth();
  const [user, setUser] = useState(null); // State to store user data
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    photoURL: '',
  }); // State to store form data

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
      setFormData({
        name: profile.name || '',
        surname: profile.surname || '',
        photoURL: profile.photoURL || '',
      });
    };

    fetchProfile();
  }, [getUserProfile]); // Include getUserProfile in the dependency array

  console.log(user);

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
    const { name, surname, photoURL } = formData;
    try {
      await updateUserProfile(name, surname, photoURL); // Save the download URL
      console.log(getUserProfile());

      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {/* Render only if user is not null */}
      {user ? (
        <>
          {/* Obrazek profilowy */}
          <div className="relative w-32 h-32 mb-6 group">
            <Image
              src={formData.photoURL || '/default-profile.png'} // Fallback to a default image
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
              <input
                type="text"
                name="surname"
                placeholder="Set up your surname"
                value={formData.surname}
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
        </>
      ) : (
        <p>Loading...</p> // Show a loading message while fetching user data
      )}
      <BottomNavBar />
    </div>
  );
}