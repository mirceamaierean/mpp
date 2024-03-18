"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, Dispatch, SetStateAction } from "react";
import { useCarStore } from "@/store/zustand";
import CloseIcon from "@mui/icons-material/Close";
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
import "react-toastify/dist/ReactToastify.css";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function AddCarForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const addCar = useCarStore((state) => state.addCar);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [body, setBody] = useState<BodyType>("Sedan");
  const [transmission, setTransmission] =
    useState<TransmissionType>("Automatic");
  const [driveType, setDriveType] = useState<DriveType>("FWD");
  const [fuelType, setFuelType] = useState<FuelType>("Gasoline");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCar({
      make,
      model,
      year,
      color,
      body,
      transmission,
      driveType,
      fuelType,
    });
    setOpen(false);
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
        Submit
      </Button>
    </FormControl>
  );
}

export default function AddCarModal({ open, setOpen }: Props) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[40%] sm:top-[25%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]  w-96 sm:w-[700px] bg-white p-4 rounded-lg">
        <CloseIcon
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 cursor-pointer m-4"
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="pb-4"
        >
          Add Car
        </Typography>
        <AddCarForm setOpen={setOpen} />
      </Box>
    </Modal>
  );
}
