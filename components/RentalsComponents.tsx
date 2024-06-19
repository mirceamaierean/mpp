import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RentalsComponent({ rentals }: { rentals: any[] }) {
  const downloadInvoice = async (url: string) => {
    const res = await fetch(`/api/invoices?url=${url}`);
    // // res returns a pdf file
    const blob = await res.blob();
    const windowUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = windowUrl;
    a.download = "invoice.pdf";
    a.click();
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">My Rentals</h1>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Car</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Download Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow
                key={rental.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {rental.cars.make} {rental.cars.model}
                </TableCell>
                {/* display date nicely for end user */}
                <TableCell align="center">
                  {new Date(rental.startdate).toDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(rental.enddate).toDateString()}
                </TableCell>
                <TableCell align="center">{rental.value} €</TableCell>
                <TableCell align="center">
                  {rental.receiptUrl && (
                    <button
                      className="bg-primary text-white rounded p-2 hover:bg-secondary"
                      onClick={() => downloadInvoice(rental.receiptUrl)}
                    >
                      Download
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
