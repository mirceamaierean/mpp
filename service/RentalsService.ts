import { Rental } from "@/types/types";

export const getRentalsCountForCar = async (carId: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/car/count",
      {
        method: "POST",
        body: JSON.stringify({ carId }),
      },
    );

    if (res.status === 404) return null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const getRentalsByUserInInterval = async (
  skip: number,
  length: number,
  column: string,
  direction: string,
  carId: number,
  userEmail: string,
) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/car",
      {
        method: "POST",
        body: JSON.stringify({
          skip: skip,
          length: length,
          column: column,
          direction: direction,
          carId: carId,
          userEmail: userEmail,
        }),
      },
    );
    if (res.status === 404) return [];
    const data = await res.json();
    return data as Rental[];
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
};

export const getRentalById = async (id: number) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/rentals", {
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
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/car",
      {
        method: "POST",
        body: JSON.stringify({ carId }),
      },
    );

    if (res.status === 404) return null;

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const addRentalToDB = async (rental: Omit<Rental, "id">) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/add",
    {
      method: "POST",
      body: JSON.stringify({ data: rental }),
      headers: {
        return: "representation",
      },
    },
  );

  return res;
};

export const updateRentalInDB = async (rental: Rental) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/update",
    {
      method: "PATCH",
      body: JSON.stringify({ data: rental }),
    },
  );

  return res;
};

export const deleteRentalsInDB = async (rentalIds: number[]) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/delete",
    {
      method: "DELETE",
      body: JSON.stringify({ data: rentalIds }),
    },
  );

  return res;
};
