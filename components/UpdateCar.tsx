"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Button, FormControl } from "@mui/base";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import {
  BodyType,
  TransmissionType,
  DriveType,
  FuelType,
  BodyTypes,
  Car,
} from "@/types/types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCarInDB } from "@/service/CarsApi";
import { isColor } from "@/utils/functions";
type Props = {
  car: Car;
};

function UpdateCarForm({ car }: Props) {
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [color, setColor] = useState(car.color);
  const [body, setBody] = useState<BodyType>(car.body ? car.body : "Sedan");
  const [transmission, setTransmission] = useState<TransmissionType>(
    car.transmission ? car.transmission : "Automatic",
  );
  const [driveType, setDriveType] = useState<DriveType>(
    car.drivetype ? car.drivetype : "2WD",
  );
  const [fuelType, setFuelType] = useState<FuelType>(
    car.fueltype ? car.fueltype : "Gasoline",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isColor(color.trim())) {
      toast.error("Invalid Color", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (make.trim() === "" || model.trim() === "") {
      toast.error("Make and model must not be empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const currentYear = new Date().getFullYear();
    if (year < 1950 || year > currentYear) {
      toast.error("Year must be between 1950 and the current year", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const res = await updateCarInDB({
      id: car.id,
      make,
      model,
      year,
      color,
      body,
      transmission,
      drivetype: driveType,
      fueltype: fuelType,
    } as Car);

    if (res.status === 400) {
      toast.warn("Failed to update car", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    toast.success("Car has been updated!", {
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
          {["2WD", "4WD"].map((type) => (
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

export default function UpdateCarModal({ car }: Props) {
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

        <UpdateCarForm car={car} />
      </Box>
      <ToastContainer />
    </>
  );
}
