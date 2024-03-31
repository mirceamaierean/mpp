import { create } from "zustand";
import { Car } from "@/types/types";

type State = {
  cars: Car[];
  addCar: (car: Car) => void;
  removeCar: (id: number) => void;
  deleteAllCars: () => void;
  updateCar: (id: number, car: Partial<Car>) => void;
};

export const useCarStore = create<State>((set) => ({
  cars: [],
  addCar: (car) =>
    set((state) => ({
      cars: [...state.cars, car],
    })),
  removeCar: (id) =>
    set((state) => ({ cars: state.cars.filter((car) => car.id !== id) })),
  deleteAllCars: () => set({ cars: [] }),
  updateCar: (id, car) =>
    set((state) => ({
      cars: state.cars.map((c) => (c.id === id ? { ...c, ...car } : c)),
    })),
}));
