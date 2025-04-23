import React from "react";
import Link from "next/link";

const StartingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        To continue, you must create an account or log in to an existing one.
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
          <button>
            Login
          </button>
        </Link >
        <Link href="/register" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center">
          <button>
          Register
          </button>
        </Link >
      </div>
    </div>
  );
};

export default StartingPage;
