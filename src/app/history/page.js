'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndAppointments = async (user) => {
      try {
        // Step 1: Fetch the user document from the "uzytkownicy" collection
        const userDocRef = query(
          collection(db, "uzytkownicy"),
          where("uid", "==", user.uid)
        );
        const userSnapshot = await getDocs(userDocRef);

        if (userSnapshot.empty) {
          console.error("User document not found");
          setLoading(false);
          return;
        }

        const userData = userSnapshot.docs[0].data();
        const orderedPartsIds = userData.zamowione_czesci || [];
        const appointmentIds = userData.wizyty || [];

        // Step 2: Fetch the car parts from the "czesci-samochodowe" collection
        let userOrders = [];
        if (orderedPartsIds.length > 0) {
          const carPartsRef = collection(db, "czesci-samochodowe");
          const carPartsQuery = query(
            carPartsRef,
            where("__name__", "in", orderedPartsIds)
          );
          const carPartsSnapshot = await getDocs(carPartsQuery);

          userOrders = carPartsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        // Step 3: Fetch the appointments from the "uslugi" collection
        let userAppointments = [];
        if (appointmentIds.length > 0) {
          const appointmentsRef = collection(db, "uslugi");
          const appointmentsQuery = query(
            appointmentsRef,
            where("__name__", "in", appointmentIds)
          );
          const appointmentsSnapshot = await getDocs(appointmentsQuery);

          userAppointments = appointmentsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setOrders(userOrders);
        setAppointments(userAppointments);
      } catch (error) {
        console.error("Error fetching orders or appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrdersAndAppointments(user);
      } else {
        console.error("User not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (orders.length === 0 && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4 mt-4">No previous history found</h1>
        <BottomNavBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4 mt-4">Purchase History</h1>

      {/* Orders List */}
      {orders.length > 0 && (
        <div className="w-full sm:w-3/5 lg:w-2/5 mb-8">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <ul>
            {orders.map((order) => (
              <li
                key={order.id}
                className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200"
              >
                <h3 className="text-lg font-semibold">{order.typ}</h3>
                <p className="text-sm text-gray-600">{order.nazwa}</p>
                <p className="text-sm text-gray-600">{order.cena} zł</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Appointments List */}
      {appointments.length > 0 && (
        <div className="w-full sm:w-3/5 lg:w-2/5">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200"
              >
                <h3 className="text-lg font-semibold">{appointment.typ}</h3>
                <p className="text-sm text-gray-600">{appointment.data}</p>
                <p className="text-sm text-gray-600">{appointment.opis}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}