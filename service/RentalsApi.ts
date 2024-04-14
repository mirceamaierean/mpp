import { Rental } from "@/types/types";

export const getAllRentals = async () => {
  const res = await fetch("/api/rentals", { method: "GET" });

  const data = await res.json();

  return data as Rental[];
};

export const getRentalById = async (id: number) => {
  try {
    const res = await fetch("/api/rentals", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (res.status === 404) return null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const getRentalsByCarId = async (carId: number) => {
  try {
    const res = await fetch("/api/rentals/car", {
      method: "POST",
      body: JSON.stringify({ carId }),
    });

    if (res.status === 404) return null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const addRentalToDB = async (rental: Omit<Rental, "id">) => {
  const res = await fetch("/api/rentals/add", {
    method: "POST",
    body: JSON.stringify({ data: rental }),
    headers: {
      return: "representation",
    },
  });

  return res;
};

export const updateRentalInDB = async (rental: Rental) => {
  const res = await fetch("/api/rentals/update", {
    method: "PATCH",
    body: JSON.stringify({ data: rental }),
  });

  return res;
};

export const deleteRentalsInDB = async (rentalIds: number[]) => {
  const res = await fetch("/api/rentals/delete", {
    method: "DELETE",
    body: JSON.stringify({ data: rentalIds }),
  });

  return res;
};
