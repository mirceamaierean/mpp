"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { PersonRecord } from "@/types/types";
import { ToastContainer } from "react-toastify";

export default function AggregationsTable() {
  const [personRecords, setPersonRecords] = useState<PersonRecord[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fetchData = async (skip: number, length: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        process.env.NEXT_PUBLIC_APP_URL + "/api/rentals/persons-stats",
        {
          method: "POST",
          body: JSON.stringify({
            skip: skip,
            length: length,
          }),
        },
      );

      const data = await res.json();

      const filteredData = data.map((user: any) => {
        return {
          name: user.user.name,
          email: user.user.email,
          numberOfRentals: user._count._all,
        };
      });
      setPersonRecords(filteredData as PersonRecord[]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage).catch((err: any) =>
      console.error(err),
    );
  }, [page, rowsPerPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-primary">
                <TableSortLabel>Name</TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel>Email</TableSortLabel>
              </TableCell>
              <TableCell className="font-bold text-primary">
                <TableSortLabel>Numer Of Records</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personRecords.map((personRecord) => (
              <TableRow key={personRecord.email}>
                <TableCell>{personRecord.name}</TableCell>
                <TableCell>{personRecord.email}</TableCell>
                <TableCell>{personRecord.numberOfRentals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={371231}
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
