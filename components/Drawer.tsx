import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";

interface DrawerProps {
  user: User;
  isProfileSelected: boolean;
  setProfileSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Drawer({
  user,
  isProfileSelected,
  setProfileSelected,
}: DrawerProps) {
  return (
    <aside className="w-64 bg-white shadow-lg z-40">
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
              onClick={() => setProfileSelected(true)}
              className={`w-full p-4 block text-left ${
                isProfileSelected ? "bg-gray-200" : ""
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setProfileSelected(false)}
              className={`w-full p-4 block text-left ${
                !isProfileSelected ? "bg-gray-200" : ""
              }`}
            >
              Rentals
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
