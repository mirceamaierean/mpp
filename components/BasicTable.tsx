"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCarStore } from "@/store/zustand";
import { Button } from "@mui/base";
import AddCarModal from "./AddCarModal";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { BodyType, FuelType, TransmissionType, DriveType } from "@/types";
import UpdateCarModal from "./UpdateCarModal";

function createData(
  make: string,
  model: string,
  year: number,
  color: string,
  body?: BodyType,
  transmission?: TransmissionType,
  driveType?: DriveType,
  fuelType?: FuelType,
) {
  return { make, model, year, color, body, transmission, driveType, fuelType };
}

const rows = [
  createData(
    "Ford",
    "Fusion",
    2019,
    "Black",
    "Sedan",
    "Automatic",
    "FWD",
    "Gasoline",
  ),
  createData(
    "Chevy",
    "Malibu",
    2020,
    "Red",
    "Coupe",
    "Automatic",
    "AWD",
    "Electric",
  ),
  createData(
    "Toyota",
    "Camry",
    2021,
    "White",
    "SUV",
    "Manual",
    "RWD",
    "Hybrid",
  ),
  createData(
    "Honda",
    "Civic",
    2018,
    "Blue",
    "Hatchback",
    "Automatic",
    "FWD",
    "Diesel",
  ),
  createData(
    "Nissan",
    "Altima",
    2017,
    "Gray",
    "Convertible",
    "Manual",
    "AWD",
    "Gasoline",
  ),
  createData(
    "Ford",
    "Fusion",
    2019,
    "Black",
    "Sedan",
    "Automatic",
    "FWD",
    "Gasoline",
  ),
  createData(
    "Chevy",
    "Malibu",
    2020,
    "Red",
    "Coupe",
    "Automatic",
    "AWD",
    "Electric",
  ),
  createData(
    "Toyota",
    "Camry",
    2021,
    "White",
    "SUV",
    "Manual",
    "RWD",
    "Hybrid",
  ),
  createData(
    "Honda",
    "Civic",
    2018,
    "Blue",
    "Hatchback",
    "Automatic",
    "FWD",
    "Diesel",
  ),
  createData(
    "Nissan",
    "Altima",
    2017,
    "Gray",
    "Convertible",
    "Manual",
    "AWD",
    "Gasoline",
  ),
];
export default function BasicTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const cars = useCarStore((state) => state.cars);
  const addCar = useCarStore((state) => state.addCar);
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [carId, setCarId] = useState<number>(0);

  const initCars = () => {
    rows.forEach((car) => {
      addCar({
        make: car.make,
        model: car.model,
        year: car.year,
        color: car.color,
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AddCarModal open={open} setOpen={setOpen} />
      <UpdateCarModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        carId={carId}
      />
      <div className="flex justify-end">
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white"
          onClick={initCars}
        >
          <UpdateIcon />
          Load Data
        </Button>
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
          Add Car
        </Button>

        {selectedIds.length > 0 && (
          <Button
            className="px-4 py-2 m-2 bg-primary rounded-md text-white"
            onClick={() => {
              cars.forEach((car) => {
                if (selectedIds.includes(car.id)) {
                  useCarStore.getState().removeCar(car.id);
                  setSelectedIds([]);
                }
              });
            }}
          >
            <DeleteIcon />
            Delete Car
          </Button>
        )}
      </div>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-primary w-2">
                <Checkbox
                  checked={
                    selectedIds.length === cars.length && cars.length > 0
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? cars.map((car) => car.id) : [],
                    )
                  }
                />
              </TableCell>
              <TableCell className="font-bold text-primary">Make</TableCell>
              <TableCell className="font-bold text-primary">Model</TableCell>
              <TableCell className="font-bold text-primary">Year</TableCell>
              <TableCell className="font-bold text-primary">Color</TableCell>
              <TableCell className="font-bold text-primary">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <Checkbox
                    className="mx-auto4"
                    checked={selectedIds.includes(car.id)}
                    onChange={(e) => {
                      e.target.checked
                        ? setSelectedIds([...selectedIds, car.id])
                        : setSelectedIds(
                            selectedIds.filter((id) => id !== car.id),
                          );
                    }}
                  ></Checkbox>
                </TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setCarId(car.id);
                      setOpenUpdateModal(true);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
