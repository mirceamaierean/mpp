import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface Props {
  image?: string;
  make: string;
  model: string;
  link: string;
  price: number;
}

const CarCard: React.FC<Props> = ({ make, model, link, price }) => {
  return (
    <div className="flex flex-col justify-between max-w-sm bg-white rounded-sm border border-gray-200 hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
      <div className="overflow-hidden">
        <Link href={link}>
          <Image
            src="https://d1gymyavdvyjgt.cloudfront.net/drive/images/made/drive/images/remote/https_d2yv47kjv2gmpz.cloudfront.net/filestore/1/9/4_bb57d7901fc42e8/14f542d0f15c88e18227675fe437bb7e/491_f2666f0147bd7c1_794_529_70.jpg"
            alt={make}
            width={500}
            height={300}
            className="transition-transform duration-300 transform hover:scale-110"
          />
        </Link>
      </div>
      <div className="p-5 font-roboto">
        <Link href={link}>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
            {make}
          </h5>
          <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
            {model}
          </h5>
        </Link>
        <div className="pb-3">
          <span className="price text-xl font-bold text-gray-900">
            Price: €{price}
          </span>
        </div>
        <Link href={link}>
          <button className="bg-primary text-white px-4 py-2 rounded-lg w-full">
            Rent
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
