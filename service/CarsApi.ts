import { Car } from "@/types/types";

export const getAllCars = async () => {
  const res = await fetch("/api/cars", { method: "GET" });

  const data = await res.json();

  return data as Car[];
};

export const getCarById = async (id: number) => {
  const res = await fetch("/api/cars", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  return data;
};

export const addCarToDB = async (car: Omit<Car, "id">) => {
  const res = await fetch("/api/cars/add", {
    method: "POST",
    body: JSON.stringify({ data: car }),
    headers: {
      return: "representation",
    },
  });

  return res;
};

export const updateCarInDB = async (car: Car) => {
  const res = await fetch("/api/cars/update", {
    method: "PATCH",
    body: JSON.stringify({ data: car }),
  });

  return res;
};

export const deleteCarsInDB = async (carIds: number[]) => {
  const res = await fetch("/api/cars/delete", {
    method: "DELETE",
    body: JSON.stringify({ data: carIds }),
  });

  return res;
};
