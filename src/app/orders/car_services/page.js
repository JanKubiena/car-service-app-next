'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import BottomNavBar from "@/components/BottomNavBar";

export default function CarService() {
  const [carService, setCarService] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarService = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "uslugi"));
        const services = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarService(services);
      } catch (error) {
        console.error("Error fetching car services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarService();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Car Services</h1>
      <ul className="w-full sm:w-3/5 lg:w-2/5">
        {carService.map((service) => (
          <li
            key={service.id}
            className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          >
            <Link href={`/orders/car_services/${service.id}`}>
                <h2 className="text-lg font-semibold">{service.typ}</h2>
                <p className="text-sm text-gray-600">{service.cena} zł</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="relative mt-4 mb-24">For more car services please contact us</p>
      <BottomNavBar />
    </div>
  );
}