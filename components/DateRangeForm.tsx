"use client";
import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { getCarsThatAreNotInRent } from "@/service/CarsService";
import { Car } from "@/types/types";

const DateRangeForm: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split("T")[0]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDateAsDate = new Date(e.target.value);
    const endDateAsDate = new Date(endDate);
    if (startDateAsDate >= endDateAsDate) {
      // set end date to the next day
      const nextDay = new Date(startDateAsDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay.toISOString().split("T")[0]);
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDateAsDate = new Date(startDate);
    const endDateAsDate = new Date(e.target.value);
    if (startDateAsDate >= endDateAsDate) {
      // set start date to the previous day
      const previousDay = new Date(endDateAsDate);
      previousDay.setDate(previousDay.getDate() - 1);
      setStartDate(previousDay.toISOString().split("T")[0]);
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const carsNotInRent = await getCarsThatAreNotInRent(startDate, endDate);

    setCars(carsNotInRent);
  };

  useEffect(() => {
    const fetchCars = async () => {
      const carsNotInRent = await getCarsThatAreNotInRent(startDate, endDate);

      setCars(carsNotInRent);
    };

    fetchCars();
  }, [endDate, startDate]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-full bg-gray-100 p-4 rounded-lg flex items-center justify-around mb-10"
      >
        <div className="flex flex-col items-center">
          <label
            htmlFor="start-date"
            className="block text-gray-700 font-medium mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-96"
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="end-date"
            className="block text-gray-700 font-medium mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-96"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-primary text-sm text-white rounded-lg"
        >
          Update date interval
        </button>
      </form>
      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {cars.map((car, index) => (
          <CarCard
            key={index}
            car={car}
            link={`/cars/${car.id}?start=${startDate}&end=${endDate}`}
          />
        ))}
      </div>
    </>
  );
};

export default DateRangeForm;
