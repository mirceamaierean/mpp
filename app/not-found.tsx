import Link from "next/link";
import Image from "next/image";
import lost from "../public/images/lost.gif";

export default function NotFound() {
  return (
    <div className="flex flex-col mx-auto items-center mt-32 sm:mt-4">
      <Image src={lost} alt="Lost" width={300} height={300} />
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h1 className="text-3xl font-bold my-4">404 - Page Not Found</h1>
        <p className="mx-auto py-4">You&apos;ve stumbled upon a rarity!</p>
        <Link
          href="/"
          className="mt-8 mx-auto py-3 px-4 bg-primary rounded-md text-white disabled:opacity-50"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
