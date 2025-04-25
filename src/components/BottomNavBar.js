import Link from "next/link";
import Image from "next/image";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white text-black shadow-md flex justify-around items-center h-16">
      <Link href="/" className="flex flex-col items-center">
          <Image src="/icons/home.png" alt="Home" width={24} height={24} />
          <span className="text-xs">Home</span>
      </Link>
      <Link href="/orders" className="flex flex-col items-center">
          <Image src="/icons/order.png" alt="Ord" width={24} height={24} />
          <span className="text-xs">Orders</span>
      </Link>
      <Link href="/history" className="flex flex-col items-center">
          <Image src="/icons/visits.png" alt="Vis" width={24} height={24} />
          <span className="text-xs">History</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
          <Image src="/icons/user.png" alt="Acc" width={24} height={24} />
          <span className="text-xs">Account</span>
      </Link>
    </nav>
  );
}