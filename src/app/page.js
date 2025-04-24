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
          backgroundImage: "url('https://png.pngtree.com/element_our/png/20180823/auto-car-service-template-png_62235.jpg')", // Wstaw ścieżkę do swojej grafiki
        }}
      ></div>
      <BottomNavBar />
      <h1 className="text-4xl font-bold mb-6">Welcome to CarTel Service App</h1>
      <p className="text-lg mb-4">
      Your one-stop solution for managing car services, scheduling visits, and ordering parts.
      </p>
      <p className="text-lg mb-4">
      Simplify your car maintenance with our easy-to-use app and stay on top of your vehicle's needs.
      </p>
      <p className="text-lg mb-4">
      Join thousands of satisfied users who trust us to keep their cars in top condition.
      </p>
        <button
          onClick={logOut}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
          Sign out
        </button>
        <div className="relative z-10 mt-16 w-full max-w-4xl text-center">
  <h2 className="text-2xl font-bold mb-4">Here you can find us</h2>
  <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=19.975434%2C50.210916%2C19.981434%2C50.214916&layer=mapnik&marker=50.212916%2C19.978434"
      className="w-full h-full border-0"
      allowFullScreen=""
      loading="lazy"
      title="Car Service Location"
    ></iframe>
  </div>
</div>
      </div>
  );
}
