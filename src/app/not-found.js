'use client'; // <-- required to use hooks like useRouter or usePathname

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router compatible

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h1>Page Not Found</h1>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
}