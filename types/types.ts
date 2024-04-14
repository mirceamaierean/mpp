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
  driveType?: DriveType;
  fuelType?: FuelType;
};

export type Rental = {
  id: number;
  carId: number;
  startDate: string;
  endDate: string;
  value: number;
};
