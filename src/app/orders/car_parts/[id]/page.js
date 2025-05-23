'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function CarPartDetails() {
  const { id } = useParams(); // Get the dynamic route parameter
  const router = useRouter(); // For navigation
  const [carPart, setCarPart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCarPart = async () => {
      try {
        const docRef = doc(db, "czesci-samochodowe", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCarPart({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching car part:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarPart();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!carPart) {
    return <div className="flex justify-center items-center h-screen">Car part not found</div>;
  }

  const handleNavigateToPayment = () => {
    router.push(`/payment/parts?id=${id}`); // Navigate to the PaymentPage with the id as a query parameter
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-black-900 transition-all"
      >
        Back
      </button>

      {/* Car Part Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-3/5 lg:w-2/5">
        <h1 className="text-2xl font-bold mb-4 text-center">{carPart.typ}</h1>
        <p className="text-lg mb-2 text-gray-700">
          <span className="font-semibold">Brand:</span> {carPart.nazwa}
        </p>
        <p className="text-lg mb-2 text-gray-700">
          <span className="font-semibold">Price:</span> {carPart.cena} zł
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Description:</span> {carPart.opis || "No description available."}
        </p>
      </div>

      {/* Order Button */}
      <button
        onClick={handleNavigateToPayment} // Navigate to the PaymentPage
        className="bg-blue-500 text-white w-full sm:w-3/5 lg:w-2/5 mt-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Order
      </button>

      <BottomNavBar />
    </div>
  );
}