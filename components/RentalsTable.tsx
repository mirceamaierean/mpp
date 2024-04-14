"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { deleteRentalsInDB, getRentalsByCarId } from "@/service/RentalsApi";

interface RentalsTableProps {
  carId: number;
}

export default function RentalsTable({ carId }: RentalsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const columnToSortDefault: keyof Rental = "startDate";
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [open, setOpen] = useState(false);

  const [columnToSort, setColumnToSort] = useState<keyof Rental>(
    (searchParams.get("property") as keyof Rental) || columnToSortDefault
  );
  const [direction, setDirection] = useState<"asc" | "desc">(
    searchParams.get("direction") === "asc" ? "asc" : "desc"
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getFilteredAndSortedData = () => {
    if (rentals)
      return [...rentals].sort((a: Rental, b: Rental) => {
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
    return [];
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
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

  const handleParamsChange = (property: string, direction: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (current.has("property")) current.delete("property");

    if (current.has("direction")) current.delete("direction");
    if (current.has("fuel")) current.delete("fuel");

    if (columnToSort !== property) direction = "asc";

    const nameOfDirection = "direction";
    current.set(nameOfDirection, direction);
    current.set("property", property);

    setColumnToSort(property as keyof Rental);
    setDirection(direction as "asc" | "desc");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const getAllRentals = async () => {
    const allRentals = await getRentalsByCarId(carId);
    setRentals(allRentals);
  };

  useEffect(() => {
    handleParamsChange(columnToSort, direction);
  }, [columnToSort, direction]);

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

    checkOnlineStatus().catch((err) => console.error(err));

    getAllRentals().catch((err) => console.error(err));
  }, [open]);

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

    getAllRentals().catch((err) => console.error(err));

    setSelectedIds([]);
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
                      e.target.checked ? rentals.map((rental) => rental.id) : []
                    )
                  }
                />
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "startDate"}
                  direction={direction}
                  onClick={() => {
                    setDirection(changeDirectionBasedOnColumn("startDate"));
                    setColumnToSort("startDate");
                  }}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel
                  active={columnToSort === "endDate"}
                  direction={direction}
                  onClick={() => {
                    setDirection(changeDirectionBasedOnColumn("endDate"));
                    setColumnToSort("endDate");
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
            {getFilteredAndSortedData()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    <Checkbox
                      className="mx-auto4"
                      checked={selectedIds.includes(rental.id)}
                      onChange={(e) => {
                        e.target.checked
                          ? setSelectedIds([...selectedIds, rental.id])
                          : setSelectedIds(
                              selectedIds.filter((id) => id !== rental.id)
                            );
                      }}
                    ></Checkbox>
                  </TableCell>
                  <TableCell>{rental.startDate}</TableCell>
                  <TableCell>{rental.endDate}</TableCell>
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
          count={getFilteredAndSortedData().length}
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
