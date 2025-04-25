'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function CarParts() {
  const [carParts, setCarParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "czesci-samochodowe"));
        const parts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarParts(parts);
        setFilteredParts(parts); // Initialize filtered parts
      } catch (error) {
        console.error("Error fetching car parts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarParts();
  }, []);

  // Filter car parts based on the search term
  useEffect(() => {
    const filtered = carParts.filter((part) =>
      part.typ.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.nazwa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParts(filtered);
  }, [searchTerm, carParts]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4 mt-4">Car Parts</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search car parts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-3/5 lg:w-2/5 mb-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Car Parts List */}
      <ul className="w-full sm:w-3/5 lg:w-2/5">
        {filteredParts.map((part) => (
          <li
            key={part.id}
            className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200"
          >
            <Link href={`/orders/car_parts/${part.id}`}>
                <h2 className="text-lg font-semibold">{part.typ}</h2>
                <p className="text-sm text-gray-600">{part.nazwa}</p>
                <p className="text-sm text-gray-600">{part.cena} zł</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="relative mt-4 mb-24">For more car parts please contact us</p>
      <BottomNavBar />
    </div>
  );
}