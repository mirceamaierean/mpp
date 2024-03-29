"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCarStore } from "@/store/zustand";
import { Button, FormControl } from "@mui/base";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import {
  BodyType,
  TransmissionType,
  DriveType,
  FuelType,
  BodyTypes,
} from "@/types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  carId: number;
};

function UpdateCarForm({ carId }: Props) {
  const updateCar = useCarStore((state) => state.updateCar);
  const cars = useCarStore((state) => state.cars);
  const currentCar = cars.find((car) => car.id === carId);
  const [make, setMake] = useState(currentCar?.make || "");
  const [model, setModel] = useState(currentCar?.model || "");
  const [year, setYear] = useState(currentCar?.year || 0);
  const [color, setColor] = useState(currentCar?.color || "");
  const [body, setBody] = useState<BodyType>(currentCar?.body || "Sedan");
  const [transmission, setTransmission] = useState<TransmissionType>(
    currentCar?.transmission || "Automatic",
  );
  const [driveType, setDriveType] = useState<DriveType>(
    currentCar?.driveType || "FWD",
  );
  const [fuelType, setFuelType] = useState<FuelType>(
    currentCar?.fuelType || "Gasoline",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCar(carId, {
      make,
      model,
      year,
      color,
      body,
      transmission,
      driveType,
      fuelType,
    });
    toast("Car has been updated!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleBodyChange = (e: SelectChangeEvent) => {
    setBody(e.target.value as BodyType);
  };

  const handleTransmissionChange = (e: SelectChangeEvent) => {
    setTransmission(e.target.value as TransmissionType);
  };

  const handleDriveTypeChange = (e: SelectChangeEvent) => {
    setDriveType(e.target.value as DriveType);
  };

  const handleFuelTypeChange = (e: SelectChangeEvent) => {
    setFuelType(e.target.value as FuelType);
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
        <Input
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <Input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <Input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Select value={body} onChange={handleBodyChange}>
          {/* get all the possible types for BodyType */}
          {BodyTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Select value={transmission} onChange={handleTransmissionChange}>
          {["Automatic", "Manual"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Select value={driveType} onChange={handleDriveTypeChange}>
          {["FWD", "RWD", "AWD"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Select value={fuelType} onChange={handleFuelTypeChange}>
          {["Gasoline", "Diesel", "Electric", "Hybrid"].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        className="bg-primary text-white w-full py-2 rounded-md mt-4"
      >
        Update Car
      </Button>
    </FormControl>
  );
}

export default function UpdateCarModal({ carId }: Props) {
  return (
    <>
      <Box className="mx-auto transform w-96 sm:w-[700px] bg-white p-4 rounded-lg">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="pb-4"
        >
          Update Car Information
        </Typography>
        <UpdateCarForm carId={carId} />
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
