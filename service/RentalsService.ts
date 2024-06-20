import { Rental } from "@/types/types";

export const getAllRentals = async (
  skip: number,
  length: number,
  column: string,
  direction: string,
) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL +
        "/api/rentals?skip=" +
        skip +
        "&length=" +
        length +
        "&column=" +
        column +
        "&direction=" +
        direction,
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
};

export const getRentalsRelativeToDate = async (upcoming: boolean) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL +
      "/api/rentals/relative-to-date?upcoming=" +
      upcoming,
  );

  const data = await res.json();

  return data;
};

export const getRentalsCount = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/count",
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

export const getRentalsByUserWithCar = async (userId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/user-rentals?id=" + userId,
  );

  const data = await res.json();

  return data;
};

export const checkIfCarIsAvailable = async (
  carId: number,
  startDate: string,
  endDate: string,
) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL +
      "/api/rentals/car/available?carId=" +
      carId +
      "&startDate=" +
      startDate +
      "&endDate=" +
      endDate,
  );

  const data = await res.json();

  return data;
};

export const getRevenueInTimeFrame = async (
  startDate: string,
  endDate: string,
) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL +
      "/api/rentals/revenue?startDate=" +
      startDate +
      "&endDate=" +
      endDate,
  );

  const data = await res.json();

  return data;
};
