'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { query, where, collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
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

  const handleOrder = async () => {
      const auth = getAuth(); // Get the current user
      const user = auth.currentUser;
    
      if (!user) {
        alert("You must be logged in to make an appoitment.");
        return;
      }
    
      try {
        // Query the uzytkownicy collection to find the document with the matching uid field
        const usersRef = collection(db, "uzytkownicy");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
          alert("User not found in the database.");
          return;
        }
    
        // Assuming there is only one document with the matching uid
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "uzytkownicy", userDoc.id);
    
        // Update the zamowione_czesci array in the user's document
        await updateDoc(userRef, {
          wizyty: arrayUnion(id), // Add the car part ID to the zamowione_czesci array
        });
    
        alert("Appointment set successfully!");
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to set appointment. Please try again.");
      }
    };

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
      {/* Order Button */}
      <button
        onClick={handleOrder} // Call the handleOrder function
        className="bg-blue-500 text-white w-full sm:w-3/5 lg:w-2/5 mt-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
      make an appointment
      </button>
      <BottomNavBar />
    </div>
  );
}