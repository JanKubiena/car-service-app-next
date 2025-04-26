'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters
  const [id, setId] = useState(null); // State to store the id
  const [isClient, setIsClient] = useState(false); // State to check if rendering on the client
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiry, setCreditCardExpiry] = useState("");
  const [creditCardCVV, setCreditCardCVV] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client side
    setIsClient(true);
    const queryId = searchParams.get("id");
    setId(queryId);
  }, [searchParams]);

  const handleOrder = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to set an appointment.");
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

      // Update the wizyty array in the user's document
      await updateDoc(userRef, {
        wizyty: arrayUnion(id), // Add the appointment ID to the wizyty array
      });

      alert("Appointment set successfully! Appointment details have been sent to your email address.");
      router.push("/history"); // Redirect to the history page after placing the order
    } catch (error) {
      console.error("Error setting appointment:", error);
      alert("Failed to set appointment. Please try again.");
    }
  };

  if (!isClient || !id) {
    // Render nothing or a loading state until the id is available and client-side rendering is ready
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOrder();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700">
            Choose Appointment Date:
          </label>
          <input
            type="date"
            id="appointment-date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700">
            Choose Appointment Time:
          </label>
          <select
            id="appointment-time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a time</option>
            <option value="06:00">06:00</option>
            <option value="06:30">06:30</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
          </select>
        </div>

        <div>
          <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
            Choose Payment Method:
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="cash-on-place">Cash on Place</option>
          </select>
        </div>

        {paymentMethod === "credit-card" && (
          <div className="space-y-4">
            <div>
              <label htmlFor="credit-card-number" className="block text-sm font-medium text-gray-700">
                Credit Card Number:
              </label>
              <input
                type="text"
                id="credit-card-number"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
                placeholder="Enter your credit card number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="credit-card-expiry" className="block text-sm font-medium text-gray-700">
                Expiry Date:
              </label>
              <input
                type="text"
                id="credit-card-expiry"
                value={creditCardExpiry}
                onChange={(e) => setCreditCardExpiry(e.target.value)}
                placeholder="MM/YY"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="credit-card-cvv" className="block text-sm font-medium text-gray-700">
                CVV:
              </label>
              <input
                type="text"
                id="credit-card-cvv"
                value={creditCardCVV}
                onChange={(e) => setCreditCardCVV(e.target.value)}
                placeholder="Enter CVV"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Pay
        </button>
      </form>
      <BottomNavBar /> {/* Include the BottomNavBar component */}
    </div>
  );
};

export default PaymentPage;