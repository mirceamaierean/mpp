import Image from "next/image";
import Link from "next/link";
import RentImage from "@/assets/images/rent.webp";

export default function HeroSection() {
  return (
    <section className="font-roboto pt-20 bg-gradient-to-br from-teal-500 to-sky-500">
      <div className="grid justify-center items-center justify-items-center max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            We have a car that {"'"}s waiting for you!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl">
            No matter if you need it for a day, or for a longer period of time,
            whether you like automatic or manual, our company provides you with
            a rental car!
          </p>
          <Link
            href="#cars"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-400 via-sky-500 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 text-gray-900 hover:text-white">
              See our cars
            </span>
          </Link>
        </div>
        <div className="order-first sm:order-last w-fit max-w-xl lg:col-span-5 lg:flex">
          <Image src={RentImage} alt="mockup" />
        </div>
      </div>
    </section>
  );
}
