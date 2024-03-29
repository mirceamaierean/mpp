import Link from "next/link";
import { SVGProps } from "react";

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="gap-6 text-lg font-medium flex flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-sm font-semibold md:text-base "
          href="/"
        >
          <Package2Icon className="w-4 h-4 sm:w-6 sm:h-6" />
        </Link>
        <Link className="text-gray-500 text-sm" href="/inventory">
          Inventory
        </Link>
        <Link className="text-gray-500 text-sm" href="/cars">
          Cars
        </Link>
        <Link className="text-gray-500 text-sm" href="/analytics">
          Analytics
        </Link>
      </nav>
    </header>
  );
}
