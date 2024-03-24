"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@mui/base";
import AddCarModal from "./AddCarModal";
import { useCarStore } from "@/store/zustand";
import AddIcon from "@mui/icons-material/Add";
import { initialCars } from "@/service/CarsApi";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  TablePagination,
  TableSortLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { CarWithId } from "@/types/types";
import { FuelType } from "@/types/types";

export default function BasicTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [fuelType, setFuelType] = useState<FuelType | "All">(
    (searchParams.get("fuel") as FuelType) || "All"
  );
  const columnToSortDefault: keyof CarWithId = "make";
  const cars = useCarStore((state) => state.cars);
  const addCar = useCarStore((state) => state.addCar);
  const [open, setOpen] = useState(false);
  const [validCars, setValidCars] = useState<CarWithId[]>([]);

  const [columnToSort, setColumnToSort] = useState<keyof CarWithId>(
    (searchParams.get("property") as keyof CarWithId) || columnToSortDefault
  );
  const [direction, setDirection] = useState<"asc" | "desc">(
    searchParams.get("direction") === "asc" ? "asc" : "desc"
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFuelTypeChange = (e: SelectChangeEvent) => {
    setFuelType(e.target.value as FuelType);
    handleParamsChange(columnToSort, direction);
  };

  const getFilteredAndSortedData = () => {
    return [...cars]
      .filter((car) => (fuelType !== "All" ? car.fuelType === fuelType : true))
      .sort((a: CarWithId, b: CarWithId) => {
        let comparison = 0;

        if (a[columnToSort] && b[columnToSort]) {
          if (a[columnToSort]! > b[columnToSort]!) {
            comparison = 1;
          } else if (a[columnToSort]! < b[columnToSort]!) {
            comparison = -1;
          }
        }

        return direction === "desc" ? comparison * -1 : comparison;
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const changeDirectionBasedOnColumn = (column: string) => {
    if (column === columnToSort) {
      return direction === "asc" ? "desc" : "asc";
    }
    return "asc";
  };

  const handleParamsChange = (property: string, direction: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (current.has("property")) current.delete("property");

    if (current.has("direction")) current.delete("direction");
    if (current.has("fuel")) current.delete("fuel");

    if (fuelType !== "All") {
      current.set("fuel", fuelType);
    }
    if (columnToSort !== property) direction = "asc";

    const nameOfDirection = "direction";
    current.set(nameOfDirection, direction);
    current.set("property", property);

    setColumnToSort(property as keyof CarWithId);
    setDirection(direction as "asc" | "desc");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    handleParamsChange(columnToSort, direction);
  }, [fuelType, columnToSort, direction]);

  const initCars = () => {
    initialCars.forEach((car) => {
      addCar(car);
    });
    setValidCars(cars);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AddCarModal open={open} setOpen={setOpen} />
        <div className="flex justify-end py-4">
          <Select
            value={fuelType}
            onChange={handleFuelTypeChange}
            className="h-10 my-auto"
          >
            {["All", "Gasoline", "Diesel", "Electric", "Hybrid"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
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
                getFilteredAndSortedData().forEach((car) => {
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
                        e.target.checked ? cars.map((car) => car.id) : []
                      )
                    }
                  />
                </TableCell>
                <TableCell className="font-bold text-primary">
                  <TableSortLabel
                    active={columnToSort === "make"}
                    direction={direction}
                    onClick={() => {
                      setDirection(changeDirectionBasedOnColumn("make"));
                      setColumnToSort("make");
                    }}
                  >
                    Make
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-bold text-primary">
                  <TableSortLabel
                    active={columnToSort === "model"}
                    direction={direction}
                    onClick={() => {
                      setDirection(changeDirectionBasedOnColumn("model"));
                      setColumnToSort("model");
                    }}
                  >
                    Model
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-bold text-primary">
                  <TableSortLabel
                    active={columnToSort === "year"}
                    direction={direction}
                    onClick={() => {
                      setDirection(changeDirectionBasedOnColumn("year"));
                      setColumnToSort("year");
                    }}
                  >
                    Year
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-bold text-primary">
                  <TableSortLabel
                    active={columnToSort === "color"}
                    direction={direction}
                    onClick={() => {
                      setDirection(changeDirectionBasedOnColumn("color"));
                      setColumnToSort("color");
                    }}
                  >
                    Color
                  </TableSortLabel>
                </TableCell>
                <TableCell className="font-bold text-primary">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredAndSortedData()
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
                                selectedIds.filter((id) => id !== car.id)
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
            count={getFilteredAndSortedData().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </Suspense>
  );
}
