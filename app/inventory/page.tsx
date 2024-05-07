"use client";
import BasicPie from "@/components/Chart";
import { useEffect, useState } from "react";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Car } from "@/types/types";
import { getInventoryDataForCars } from "@/service/CarsApi";
import { Data } from "@/components/Chart";

export default function Inventory() {
  const fetchData = async (column: string) => {
    const data = await getInventoryDataForCars(column);
    return data;
  };

  const getDataForKey = async (key: keyof Car) => {
    const data = await fetchData(key);
    return data;
  };

  const [data, setData] = useState<Data[]>([]);
  const [key, setKey] = useState<keyof Car>("make");
  const keys: Array<keyof Car> = [
    "make",
    "model",
    "color",
    "body",
    "transmission",
    "drivetype",
    "fueltype",
  ];
  useEffect(() => {
    const fetchDataForKey = async () => {
      const newData = await getDataForKey(key);
      setData(newData);
    };
    fetchDataForKey();
  }, [key]);

  const handleKeyChange = (e: SelectChangeEvent) => {
    setKey(e.target.value as keyof Car);
  };

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
          <BasicPie chartTitle={key} data={data} />
        </Box>
      </div>
    </div>
  );
}
