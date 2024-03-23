import { Car } from "@/types/types";
import {
  BodyTypes,
  TransmissionTypes,
  DriveTypes,
  FuelTypes,
} from "@/types/types";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makes = ["Ford", "Chevy", "Toyota", "Honda", "Nissan"];
const models = ["Fusion", "Malibu", "Camry", "Civic", "Altima"];
const colors = ["Black", "Red", "White", "Blue", "Gray"];

export const initialCars = Array.from({ length: 100 }, (_, index) => ({
  make: makes[getRandomInt(0, makes.length - 1)],
  model: models[getRandomInt(0, models.length - 1)],
  year: getRandomInt(2000, 2024),
  color: colors[getRandomInt(0, colors.length - 1)],
  body: BodyTypes[getRandomInt(0, BodyTypes.length - 1)],
  transmission:
    TransmissionTypes[getRandomInt(0, TransmissionTypes.length - 1)],
  driveType: DriveTypes[getRandomInt(0, DriveTypes.length - 1)],
  fuelType: FuelTypes[getRandomInt(0, FuelTypes.length - 1)],
})) as Car[];
