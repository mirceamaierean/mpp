import React from "react";
import RentalsTable from "./RentalsTable";
import CarsTable from "./CarsTable";
import RevenueComponent from "./RevenueComponent";
import MapSection from "./MapSection";

const AdminTables = ({
  carsTable,
  rentalsTable,
  statsTable,
  map,
}: {
  carsTable?: boolean;
  rentalsTable?: boolean;
  statsTable?: boolean;
  map?: boolean;
}) => {
  return (
    <main className="flex-1 p-8">
      {carsTable && <CarsTable />}
      {rentalsTable && <RentalsTable />}
      {statsTable && <RevenueComponent />}
      {map && <MapSection />}
    </main>
  );
};

export default AdminTables;
