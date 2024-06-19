import { Car } from "@/types/types";
import { cars } from "@prisma/client";

export const getCarsCount = async () => {
  try {
    const res = await fetch("/api/cars/count");
    const data = await res.json();
    return data as number;
  } catch (error) {
    console.error("Error:", error);
  }
  return 0;
};

export const getInventoryDataForCars = async (column: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/cars/group",
      {
        method: "POST",
        body: JSON.stringify({ column: column }),
      }
    );
    if (res.status === 500) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getCarsInInterval = async (
  skip: number,
  length: number,
  column: string,
  direction: string
) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL +
        `/api/cars?skip=${skip}&length=${length}&column=${column}&direction=${direction}`
    );

    if (res.status === 404) return [];
    const data = await res.json();
    return data as cars[];
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
};

export const getCarById = async (id: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/cars/get-by-id",
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    if (res.status === 404) return null;
    const data = await res.json();
    return data as Car;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const addCarToDB = async (car: Omit<Car, "id">) => {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/cars/add", {
    method: "POST",
    body: JSON.stringify({ data: car }),
    headers: {
      return: "representation",
    },
  });

  return res;
};

export const updateCarInDB = async (car: Car) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/cars/update",
    {
      method: "PATCH",
      body: JSON.stringify({ data: car }),
    }
  );

  return res;
};

export const deleteCarsInDB = async (carIds: number[]) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/cars/delete",
    {
      method: "DELETE",
      body: JSON.stringify({ data: carIds }),
    }
  );

  return res;
};

export const getCarsThatAreNotInRent = async (
  startDate: string,
  endDate: string
) => {
  // /api/rentals/avaliable-cars?startDate=start&endDate=endDate
  const res = await fetch(
    process.env.NEXT_PUBLIC_APP_URL +
      `/api/rentals/available-cars?startDate=${startDate}&endDate=${endDate}`
  );

  const data = await res.json();

  return data as Car[];
};

export const getCarsPhotos = async (id: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/cars/photos?id=" + id
    );
    if (res.status === 404) return [];
    const data = await res.json();
    return data as string[];
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
};

export const getCarLocation = async (id: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/cars/location?id=" + id
    );
    if (res.status === 404) return null;
    const data = await res.json();
    return data as { formattedAddress: string };
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
