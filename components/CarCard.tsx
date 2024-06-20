import React from "react";
import Link from "next/link";
import { Car } from "@/types/types";
import CloudinaryImage from "./CloudinaryImage";

export interface Props {
  car: Car;
  link: string;
}

const CarCard: React.FC<Props> = ({ car, link }: Props) => {
  return (
    <div className="flex flex-col justify-between max-w-sm bg-white rounded-lg border border-gray-200 hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
      <Link href={link}>
        <div className="overflow-hidden">
          <CloudinaryImage
            imageSource={`cars/${car.id}/primary`}
            width={400}
            height={250}
            alt="Car Image"
            className="object-cover w-full h-48 hover:opacity-80 rounded-t-lg hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-5 font-roboto">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {car.make}
          </h5>
          <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
            {car.model}
          </h5>
          <div className="pb-3">
            <span className="price text-xl font-bold text-gray-900">
              Price: €{car.price}
            </span>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg w-full">
            Rent
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
