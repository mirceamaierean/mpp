import React from "react";
import { cities } from "@/lib/utils";

interface DateRange {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  location?: string;
  setLocation?: React.Dispatch<React.SetStateAction<string>>;
}

const RentalDateRange: React.FC<DateRange> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  location,
  setLocation,
}: DateRange) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate < newStartDate) {
      const tomorrow = new Date(newStartDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setEndDate(tomorrow.toISOString().split("T")[0]);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (newEndDate >= startDate) {
      setEndDate(newEndDate);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    if (setLocation) setLocation(newLocation);
  };

  return (
    <>
      <div className="max-w-full p-4 rounded-lg flex items-center justify-around">
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
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-52 mx-4"
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
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-52"
            required
          />
        </div>
        {setLocation && (
          <div className="flex flex-col items-center">
            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mb-1"
            >
              City
            </label>
            <select
              id="city"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-52"
              onChange={handleLocationChange}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default RentalDateRange;
