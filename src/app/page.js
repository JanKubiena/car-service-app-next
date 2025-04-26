'use client';

import React from 'react';
import { useAuth } from './context/AuthContext';
import StartingPage from "@/components/StartingPage";
import BottomNavBar from "@/components/BottomNavBar";
import GoogleMapRouteComponent from "@/components/GoogleMap";


export default function Home() {
  const { user } = useAuth();

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
          <GoogleMapRouteComponent/>
        </div>
      </div>
      <div className="relative mt-32 w-full max-w-4xl text-center">
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
      <BottomNavBar />
    </div>
  );
}
