'use client';

import Link from 'next/link';
import BottomNavBar from "@/components/BottomNavBar";

export default function AllProducts() {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <Link href="/orders/car_parts" className="w-full sm:w-3/5 lg:w-2/5 mb-4">
        <div className="bg-green-500 text-white flex justify-center items-center text-lg h-24 rounded-lg shadow-md hover:bg-green-600 transition-all">
          Order Car Parts
        </div>
      </Link>
      <Link href="/orders/car_services" className="w-full sm:w-3/5 lg:w-2/5">
        <div className="bg-blue-500 text-white flex justify-center items-center text-lg h-24 rounded-lg shadow-md hover:bg-blue-600 transition-all">
          Appoint Desired Car Service
        </div>
      </Link>
      <BottomNavBar />
    </div>
  );
}