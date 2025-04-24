'use client';

import React from 'react';
import { useAuth } from './context/AuthContext';
import StartingPage from "@/components/StartingPage";
import BottomNavBar from "@/components/BottomNavBar";


export default function Home() {
  const { user, logOut } = useAuth();

  if (!user) {
    return <StartingPage />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 -z-10"
        style={{
          backgroundImage: 'url("/background.jpg")', 
        }}
      >
      </div>
      <h1 className="text-4xl font-bold mb-6">Welcome to CarTel Service App</h1>
      <p className="text-lg mb-4">
      Your one-stop solution for managing car services, scheduling visits, and ordering parts.
      </p>
      <p className="text-lg mb-4">
      Simplify your car maintenance with our easy-to-use app and stay on top of your vehicle needs.
      </p>
      <p className="text-lg mb-4">
      Join thousands of satisfied users who trust us to keep their cars in top condition.
      </p>
        <div className="relative mt-16 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Here you can find us</h2>
          <div className="w-full h-64 rounded-lg shadow-lg">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=19.975434%2C50.210916%2C19.981434%2C50.214916&layer=mapnik&marker=50.212916%2C19.978434"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title="Car Service Location"
            ></iframe>
          </div>
        </div>
        <div className="relative mt-8 w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-4">Need assistance? Call us now!</p>
              <a
                 href="tel:+48881 488 990" 
                className="text-blue-500 text-lg font-bold hover:underline"
              >
    Call us:
    +48 881 488 990
  </a>
</div>
<button
          onClick={logOut}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
          Sign out
        </button>
      <BottomNavBar />
      </div>
  );
}
