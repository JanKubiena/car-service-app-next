import React from "react";
import Link from "next/link";

const StartingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold text-center text-black mb-6">
        To continue, you must create an account or log in to an existing one.
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
          <button>
            Login
          </button>
        </Link>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Register
        </button>
      </div>
    </div>
  );
};

export default StartingPage;