"use client";
import BasicPie from "@/components/Chart";
import { useState } from "react";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCarStore } from "@/store/zustand";
import { Car } from "@/types/types";

const useData = () => {
  const cars: Car[] = useCarStore((state) => state.cars);

  const getDataForKey = (key: keyof Car) => {
    const values = cars.map((car) => car[key]);
    const uniqueValues = Array.from(new Set(values));
    let id = 0;
    return uniqueValues.map((value) => {
      const keyCars = cars.filter((car) => car[key] === value);
      const count = keyCars.length;
      if (key === "color") {
        return {
          id: id++,
          value: count,
          label: value as string,
          color: value as string,
        };
      }
      return {
        id: id++,
        value: count,
        label: value as string,
      };
    });
  };

  return {
    getDataForKey,
  };
};

export default function Inventory() {
  const { getDataForKey } = useData();
  const [key, setKey] = useState<keyof Car>("make");

  const handleKeyChange = (e: SelectChangeEvent) => {
    setKey(e.target.value as keyof Car);
  };

  const keys: Array<keyof Car> = [
    "make",
    "model",
    "color",
    "body",
    "transmission",
    "driveType",
    "fuelType",
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-5xl pt-2">
      <Select onChange={handleKeyChange} className="my-auto w-full px-2">
        {keys.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>

      <div className="flex flex-col items-center justify-center mx-auto max-w-5xl">
        <Box key={key} flexGrow={1} className="mb-8">
          <BasicPie chartTitle={key} data={getDataForKey(key)} />
        </Box>
      </div>
    </div>
  );
}
