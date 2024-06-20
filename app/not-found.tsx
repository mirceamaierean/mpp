import Link from "next/link";
import Image from "next/image";
import lost from "../public/images/lost.gif";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-4 pt-20">
      <Image src={lost} alt="Lost" width={300} height={300} />
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold text-white">404 - Page Not Found</h1>
        <p className="text-white my-4">
          This link is already rented, come back when it{"'"}s returned.
        </p>
        <Link
          href="/"
          className="mt-4 py-3 px-6 bg-primary hover:bg-secondary text-white font-bold rounded-md"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
