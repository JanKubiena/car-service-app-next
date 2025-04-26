'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar"; 

const PaymentPage = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams(); // Get query parameters
  const id = searchParams.get("id"); // Extract the id from the query parameters
  const [paymentMethod, setPaymentMethod] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiry, setCreditCardExpiry] = useState("");
  const [creditCardCVV, setCreditCardCVV] = useState("");

  const handleOrder = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const usersRef = collection(db, "uzytkownicy");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User not found in the database.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "uzytkownicy", userDoc.id);

      await updateDoc(userRef, {
        zamowione_czesci: arrayUnion(id), // Use the id from the query parameters
      });

      alert("Order placed successfully! Delivery details have been send to your email address.");

      router.push("/history"); // Redirect to the orders page after placing the order
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

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
            <option value="cash-on-delivery">Cash on Delivery</option>
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

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Delivery Address</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City:
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street:
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter your street"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="house-number" className="block text-sm font-medium text-gray-700">
                House Number:
              </label>
              <input
                type="text"
                id="house-number"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Enter your house number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                Postal Code:
              </label>
              <input
                type="text"
                id="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter your postal code"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

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