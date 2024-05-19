export const BodyTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
  "Wagon",
  "Hatchback",
  "Sports Car",
  "Crossover",
  "Minivan",
] as const;
export const TransmissionTypes = ["Automatic", "Manual"] as const;
export const DriveTypes = ["2WD", "4WD"] as const;
export const FuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"] as const;

export type BodyType = (typeof BodyTypes)[number];
export type TransmissionType = (typeof TransmissionTypes)[number];
export type DriveType = (typeof DriveTypes)[number];
export type FuelType = (typeof FuelTypes)[number];

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  body?: BodyType;
  transmission?: TransmissionType;
  drivetype?: DriveType;
  fueltype?: FuelType;
};

export type Rental = {
  id: number;
  carid: number;
  startdate: string;
  enddate: string;
  value: number;
};

export type PersonRecord = {
  name: string;
  email: string;
  numberOfRentals: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};
