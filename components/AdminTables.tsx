import React from "react";
import RentalsTable from "./RentalsTable";
import CarsTable from "./CarsTable";

const AdminTables = ({
  carsTable,
  rentalsTable,
  statsTable,
}: {
  carsTable?: boolean;
  rentalsTable?: boolean;
  statsTable?: boolean;
}) => {
  return (
    <main className="flex-1 p-8">
      {carsTable && <CarsTable />}
      {rentalsTable && <RentalsTable />}
    </main>
  );
};

export default AdminTables;
