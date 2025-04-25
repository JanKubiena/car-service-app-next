'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Use useParams and useRouter for navigation
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function CarServiceDetails() {
  const { id } = useParams(); // Get the dynamic route parameter
  const router = useRouter(); // For navigation
  const [carService, setCarService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Wait for the `id` to be available

    const fetchCarService = async () => {
      try {
        const docRef = doc(db, "uslugi", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCarService({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching car service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarService();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!carService) {
    return <div className="flex justify-center items-center h-screen">Car service not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Navigate to the previous page
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-black-900 transition-all"
      >
        Back
      </button>

      {/* Car Service Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-3/5 lg:w-2/5">
        <h1 className="text-2xl font-bold mb-4 text-center">{carService.typ}</h1>
        <p className="text-lg mb-2 text-gray-700">
          <span className="font-semibold">Price:</span> {carService.cena} zł
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Description:</span> {carService.opis || "No description available."}
        </p>
      </div>
      <BottomNavBar />
    </div>
  );
}