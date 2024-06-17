"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import AddCarModal from "./AddCarModal";
import AddIcon from "@mui/icons-material/Add";
import {
  deleteCarsInDB,
  getCarsInInterval,
  getCarsCount,
  addCarToDB,
} from "@/service/CarsService";
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
} from "@mui/material";
import { Car } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import isOnline from "is-online";
import { useInView } from "react-intersection-observer";

export default function CarsTable() {
  const { ref, inView } = useInView();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const columnToSortDefault: keyof Car = "make";
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);
  const [carsCount, setCarsCount] = useState<number>(0);

  const [columnToSort, setColumnToSort] =
    useState<keyof Car>(columnToSortDefault);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const changeDirectionBasedOnColumn = (column: string) => {
    if (column === columnToSort) {
      return direction === "asc" ? "desc" : "asc";
    }
    return "asc";
  };

  const fetchData = async (
    skip: number,
    length: number,
    direction: string,
    columnToSort: string,
  ) => {
    const data = await getCarsInInterval(skip, length, columnToSort, direction);
    setCars(data);
  };

  const checkOnlineStatus = async () => {
    if (!(await isOnline())) {
      toast.warn("You are offline", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // add every car from localstorage to db
      const cars = JSON.parse(localStorage.getItem("carData") || "[]");

      for (const car of cars) {
        const res = await addCarToDB(car);
        if (res.status === 400) {
          const error = await res.json();
          toast.warn(error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      // clear everything in localstorage
      localStorage.setItem("carData", "[]");
    }
  };

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage, direction, columnToSort).catch(
      (err: any) => console.error(err),
    );
  }, [page, rowsPerPage, columnToSort, direction]);

  useEffect(() => {
    if (inView) {
      setRowsPerPage(rowsPerPage + 50);
    }
    checkOnlineStatus().catch((err) => console.error(err));
  }, [inView]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCarsCount();
      setCarsCount(data);
    };

    fetchData().catch((err) => console.error(err));
  }, [setRowsPerPage]);

  const deleteCars = async () => {
    const res = await deleteCarsInDB(selectedIds);

    if (res.status === 400) {
      const error = await res.json();
      toast.warn(error, {
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

    setSelectedIds([]);
    fetchData(page * rowsPerPage, rowsPerPage, direction, columnToSort);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AddCarModal open={open} setOpen={setOpen} />
      <div className="flex justify-end py-4">
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
              deleteCars();
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
                    cars &&
                    selectedIds.length === cars.length &&
                    cars.length > 0
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? cars.map((car) => car.id) : [],
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
              <TableCell className="font-bold text-primary">
                View Rentals
              </TableCell>
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
                  <Link href={`/dashboard/cars/${car.id}`}>
                    <Button className="bg-primary text-white px-2 py-3 rounded-md">
                      Edit Car
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/cars/${car.id}/rentals`}>
                    <Button className="bg-primary text-white px-2 py-3 rounded-md">
                      View Your Rentals
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={carsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <ToastContainer />
      <div ref={ref}>
        <Typography className="text-center text-primary">Loading...</Typography>
      </div>
    </div>
  );
}
