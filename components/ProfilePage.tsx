"use client";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import ProfileComponent from "./ProfileComponent";
import { User } from "@prisma/client";
import RentalsComponent from "./RentalsComponents";
import { getRentalsByUserWithCar } from "@/service/RentalsService";
import { getDriverLicenseImage } from "@/service/LicenseService";

export default function ProfilePage({ user }: { user: User }) {
  const [profileSelected, setProfileSelected] = useState<boolean>(true);
  const [rentals, setRentals] = useState<any[]>([]);
  const [driverLicenseImage, setDriverLicenseImage] = useState<string>("");

  useEffect(() => {
    const fetchRentals = async () => {
      const rentalsData = await getRentalsByUserWithCar(user.id);
      setRentals(rentalsData);
    };

    const fetchDriverLicenseImage = async () => {
      const response = await getDriverLicenseImage(user.name + user.id);
      if (!response) {
        return;
      }
      const { imagePath } = await response.json();
      setDriverLicenseImage(imagePath);
    };

    fetchRentals();
    fetchDriverLicenseImage();
  }, [user.id, user.name]);

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <Drawer
        user={user}
        isProfileSelected={profileSelected}
        setProfileSelected={setProfileSelected}
      />
      <main className="flex-1 p-8">
        {profileSelected ? (
          <ProfileComponent user={user} imagePath={driverLicenseImage} />
        ) : (
          <RentalsComponent rentals={rentals} />
        )}
      </main>
    </div>
  );
}
