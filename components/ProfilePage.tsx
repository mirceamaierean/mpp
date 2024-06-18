"use client";
import { useState } from "react";
import Drawer from "./Drawer";
import ProfileComponent from "./ProfileComponent";
import { User } from "@prisma/client";
import RentalsComponent from "./RentalsComponents";

export default function ProfilePage({ user }: { user: User }) {
  const [profileSelected, setProfileSelected] = useState<boolean>(true);
  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <Drawer
        user={user}
        isProfileSelected={profileSelected}
        setProfileSelected={setProfileSelected}
      />
      <main className="flex-1 p-8">
        {profileSelected ? (
          <ProfileComponent user={user} />
        ) : (
          <RentalsComponent user={user} />
        )}
      </main>
    </div>
  );
}
