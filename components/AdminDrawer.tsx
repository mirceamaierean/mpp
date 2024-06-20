import React from "react";
import { AdminProps } from "./AdminDashboard";
import Image from "next/image";

export default function AdminDrawer({
  user,
  setCarsTable,
  setRentalsTable,
  setStatsTable,
  carsTable,
  rentalsTable,
  statsTable,
}: AdminProps) {
  const handleDrawerChange = (value: string) => {
    switch (value) {
      case "cars":
        setCarsTable && setCarsTable(true);
        setRentalsTable && setRentalsTable(false);
        setStatsTable && setStatsTable(false);
        break;
      case "rentals":
        setCarsTable && setCarsTable(false);
        setRentalsTable && setRentalsTable(true);
        setStatsTable && setStatsTable(false);
        break;
      case "stats":
        setCarsTable && setCarsTable(false);
        setRentalsTable && setRentalsTable(false);
        setStatsTable && setStatsTable(true);
        break;
    }
  };

  return (
    <aside className="w-64 bg-white pt-20 z-40">
      <div className="p-6">
        <div className="flex flex-col items-center space-x-4">
          <Image
            src={user.image as string}
            alt={user.name as string}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="mt-4">
            <h2 className="text-xl text-center font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          {/* render 2 buttons, to mark what component is rendered */}
          <li>
            <button
              onClick={() => handleDrawerChange("cars")}
              className={`w-full p-4 block text-left ${
                carsTable ? "bg-gray-200" : ""
              }`}
            >
              Cars
            </button>
          </li>
          <li>
            <button
              onClick={() => handleDrawerChange("rentals")}
              className={`w-full p-4 block text-left ${
                rentalsTable ? "bg-gray-200" : ""
              }`}
            >
              Rentals
            </button>
          </li>
          <li>
            <button
              onClick={() => handleDrawerChange("stats")}
              className={`w-full p-4 block text-left ${
                statsTable ? "bg-gray-200" : ""
              }`}
            >
              Revenue
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
