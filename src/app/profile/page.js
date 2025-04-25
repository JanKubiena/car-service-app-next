'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavBar from '@/components/BottomNavBar';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { getUserProfile, logOut } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
    };
    fetchProfile();
  }, [getUserProfile]); // Include getUserProfile in the dependency array

  console.log(user)

  const handleEditRedirect = () => {
    router.push('/edit_profile'); // Redirect to the edit profile page
  };

  const handleLogOut = () => {
    logOut(); // Log out the user
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {/* Render only if user is not null */}
      {user ? (
        <>
          {/* User Profile */}
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
            <h1 className="text-xl font-bold mb-2">{user?.name ? user.name : ''}</h1>
            <h1 className="text-xl font-bold mb-2">{user?.surname ? user.surname : ''}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <button
              onClick={handleEditRedirect}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
          <button
            onClick={handleLogOut}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </>
      ) : (
        <p>Loading...</p> // Show a loading message while fetching user data
      )}
      <BottomNavBar />
    </div>
  );
}