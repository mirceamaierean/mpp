import { create } from "zustand";
import { Car } from "@/types";


type CarWithId = Car & { id: number };

type State = {
    nextId: number;
    cars: CarWithId[];
    addCar: (car: Car) => void;
    removeCar: (id: number) => void;
    updateCar: (id: number, car: Partial<Car>) => void;
}

export const useCarStore = create<State>((set) => ({
    nextId: 1,
    cars: [],
    addCar: (car) => set((state) => ({ cars: [...state.cars, { ...car, id: state.nextId }], nextId: state.nextId + 1})),
    removeCar: (id) => set((state) => ({ cars: state.cars.filter((car) => car.id !== id) })),
    updateCar: (id, car) => set((state) => ({ cars: state.cars.map((c) => (c.id === id ? { ...c, ...car } : c) )})),
}));