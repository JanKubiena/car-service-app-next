'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const ordersRef = collection(db, "czesci-samochodowe"); // Replace with your collection name
        const q = query(ordersRef, where("ownerUids", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);

        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (orders.length === 0) {
    return (
    <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4 mt-4">No previous orders found</h1>       
        <BottomNavBar />
    </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4 mt-4">Order History</h1>

      {/* Orders List */}
      <ul className="w-full sm:w-3/5 lg:w-2/5">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200"
          >
            <h2 className="text-lg font-semibold">{order.typ}</h2>
            <p className="text-sm text-gray-600">{order.nazwa}</p>
            <p className="text-sm text-gray-600">{order.cena} zł</p>
          </li>
        ))}
      </ul>
      <BottomNavBar />
    </div>
  );
}