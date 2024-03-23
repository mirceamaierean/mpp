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
import { Checkbox, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { initialCars } from "@/service/CarsApi";
import Link from "next/link";
import TablePagination from "@mui/material/TablePagination";

export default function BasicTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const cars = useCarStore((state) => state.cars);
  const [usedCars, setUsedCars] = useState<typeof cars>(cars);
  const addCar = useCarStore((state) => state.addCar);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage);
    console.log(rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const initCars = () => {
    initialCars.forEach((car) => {
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
      <div className="flex justify-end">
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white disabled:opacity-50 flex flex-row gap-1"
          onClick={initCars}
          disabled={cars.length > 0}
        >
          <UpdateIcon />
          <Typography className="hidden sm:block">Load Data</Typography>
        </Button>
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
          <Typography className="hidden sm:block">Add Car</Typography>
        </Button>

        {selectedIds.length > 0 && (
          <Button
            className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
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
            <Typography className="hidden sm:block">Delete Car</Typography>
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
            {cars
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((car) => (
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
                    <Link href={`/cars/${car.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cars.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
