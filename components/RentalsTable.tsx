"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import AddRentalModal from "./AddRentalModal";
import AddIcon from "@mui/icons-material/Add";
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
import isOnline from "is-online";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteRentalsInDB,
  getRentalsInInterval,
  getRentalsCountForCar,
} from "@/service/RentalsApi";

interface RentalsTableProps {
  carId: number;
}

export default function RentalsTable({ carId }: RentalsTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const columnToSortDefault: keyof Rental = "startdate";
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [rentalsCount, setRentalsCount] = useState<number>(0);

  const [open, setOpen] = useState(false);

  const [columnToSort, setColumnToSort] =
    useState<keyof Rental>(columnToSortDefault);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const fetchData = async (
    skip: number,
    length: number,
    direction: string,
    columnToSort: string,
  ) => {
    const data = await getRentalsInInterval(
      skip,
      length,
      columnToSort,
      direction,
      carId,
    );
    setRentals(data);
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

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage, direction, columnToSort).catch(
      (err: any) => console.error(err),
    );
  }, [page, rowsPerPage, columnToSort, direction]);

  useEffect(() => {
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
      }
    };

    const fetchData = async () => {
      const data = await getRentalsCountForCar(carId);
      setRentalsCount(data);
    };

    checkOnlineStatus().catch((err) => console.error(err));

    fetchData().catch((err) => console.error(err));
  }, [fetchData]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AddRentalModal open={open} setOpen={setOpen} carId={carId} />
      <div className="flex justify-end py-4">
        <Button
          className="px-4 py-2 m-2 bg-primary rounded-md text-white flex flex-row gap-1"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
          <Typography className="hidden sm:block">Add Rental</Typography>
        </Button>

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
                  onClick={() => {
                    setDirection(changeDirectionBasedOnColumn("startdate"));
                    setColumnToSort("startdate");
                  }}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "enddate"}
                  direction={direction}
                  onClick={() => {
                    setDirection(changeDirectionBasedOnColumn("enddate"));
                    setColumnToSort("enddate");
                  }}
                >
                  End date
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "value"}
                  direction={direction}
                  onClick={() => {
                    setDirection(changeDirectionBasedOnColumn("year"));
                    setColumnToSort("value");
                  }}
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
                <TableCell>{rental.startdate}</TableCell>
                <TableCell>{rental.enddate}</TableCell>
                <TableCell>{rental.value}</TableCell>
                <TableCell>
                  <Link href={`/rentals/${rental.id}`}>
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
