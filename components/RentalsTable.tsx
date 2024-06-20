"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
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
import { Rental } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteRentalsInDB,
  getAllRentals,
  getRentalsCount,
  getRentalsRelativeToDate,
} from "@/service/RentalsService";

export default function RentalsTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const columnToSortDefault: keyof Rental = "startdate";
  const [rentals, setRentals] = useState<any[]>([]);
  const [rentalsCount, setRentalsCount] = useState<number>(0);

  const [columnToSort, setColumnToSort] =
    useState<keyof Rental>(columnToSortDefault);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const fetchData = async (
    skip: number,
    length: number,
    direction: string,
    columnToSort: string,
  ) => {
    const data = await getAllRentals(skip, length, columnToSort, direction);
    setRentals(data);
  };

  const getRelativeRentals = async (upcoming: boolean) => {
    const data = await getRentalsRelativeToDate(upcoming);
    setRentals(data);
  };

  const getCount = async () => {
    const count = await getRentalsCount();
    setRentalsCount(count);
  };

  useEffect(() => {
    getCount();
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSortRequest = (column: keyof Rental) => {
    const isAsc = columnToSort === column && direction === "asc";
    setDirection(isAsc ? "desc" : "asc");
    setColumnToSort(column);
  };

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage, direction, columnToSort).catch(
      (err: any) => console.error(err),
    );
  }, [page, rowsPerPage, columnToSort, direction]);

  const deleteRentals = async () => {
    const res = await deleteRentalsInDB(selectedIds);

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

    toast.success("Successfully deleted rentals", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setSelectedIds([]);
    fetchData(page * rowsPerPage, rowsPerPage, direction, columnToSort);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="flex justify-end py-4">
        {selectedIds.length > 0 && (
          <Button
            className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
            onClick={() => {
              deleteRentals();
            }}
          >
            <DeleteIcon />
            <Typography className="hidden sm:block">Delete Rentals</Typography>
          </Button>
        )}
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
          onClick={() => {
            getRelativeRentals(true);
          }}
        >
          <Typography className="hidden sm:block">Upcoming Rentals</Typography>
        </Button>
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
          onClick={() => {
            getRelativeRentals(false);
          }}
        >
          <Typography className="hidden sm:block">Past Rentals</Typography>
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-primary w-2">
                <Checkbox
                  checked={
                    rentals &&
                    selectedIds.length === rentals.length &&
                    rentals.length > 0
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? rentals.map((rental) => rental.id)
                        : [],
                    )
                  }
                />
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "startdate"}
                  direction={direction}
                  onClick={() => handleSortRequest("startdate")}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "enddate"}
                  direction={direction}
                  onClick={() => handleSortRequest("enddate")}
                >
                  End date
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">Car</TableCell>
              <TableCell className="font-bold text-primary">City</TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "value"}
                  direction={direction}
                  onClick={() => handleSortRequest("value")}
                >
                  Rental Value
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell>
                  <Checkbox
                    className="mx-auto4"
                    checked={selectedIds.includes(rental.id)}
                    onChange={(e) => {
                      e.target.checked
                        ? setSelectedIds([...selectedIds, rental.id])
                        : setSelectedIds(
                            selectedIds.filter((id) => id !== rental.id),
                          );
                    }}
                  ></Checkbox>
                </TableCell>
                <TableCell>
                  {new Date(rental.startdate).toDateString()}
                </TableCell>
                <TableCell>{new Date(rental.enddate).toDateString()}</TableCell>
                <TableCell>
                  {rental.make} {rental.model}
                </TableCell>
                <TableCell>{rental.city}</TableCell>
                <TableCell>{rental.value}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/rentals/${rental.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rentalsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <ToastContainer />
    </div>
  );
}
