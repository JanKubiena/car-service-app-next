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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={logOut}>Sign out</button>
      <BottomNavBar />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit et provident quaerat, soluta distinctio laborum ad eaque, dolor temporibus blanditiis deserunt minus dolorum, saepe consequuntur fuga odio vel unde?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit et provident quaerat, soluta distinctio laborum ad eaque, dolor temporibus blanditiis deserunt minus dolorum, saepe consequuntur fuga odio vel unde?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit et provident quaerat, soluta distinctio laborum ad eaque, dolor temporibus blanditiis deserunt minus dolorum, saepe consequuntur fuga odio vel unde?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit et provident quaerat, soluta distinctio laborum ad eaque, dolor temporibus blanditiis deserunt minus dolorum, saepe consequuntur fuga odio vel unde?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit et provident quaerat, soluta distinctio laborum ad eaque, dolor temporibus blanditiis deserunt minus dolorum, saepe consequuntur fuga odio vel unde?</p>
    </div>
  );
}
