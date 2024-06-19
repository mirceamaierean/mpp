"use client";
import React from "react";
import { useState } from "react";
import AdminDrawer from "./AdminDrawer";
import { User } from "@prisma/client";
import AdminTables from "./AdminTables";

export interface AdminProps {
  user: User;
  carsTable?: boolean;
  setCarsTable?: React.Dispatch<React.SetStateAction<boolean>>;
  rentalsTable?: boolean;
  setRentalsTable?: React.Dispatch<React.SetStateAction<boolean>>;
  statsTable?: boolean;
  setStatsTable?: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminDashboard({ user }: AdminProps) {
  const [carsTable, setCarsTable] = useState<boolean>(true);
  const [rentalsTable, setRentalsTable] = useState<boolean>(false);
  const [statsTable, setStatsTable] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminDrawer
        user={user}
        carsTable={carsTable}
        setCarsTable={setCarsTable}
        rentalsTable={rentalsTable}
        setRentalsTable={setRentalsTable}
        statsTable={statsTable}
        setStatsTable={setStatsTable}
      />
      <AdminTables
        carsTable={carsTable}
        rentalsTable={rentalsTable}
        statsTable={statsTable}
      />
    </div>
  );
}

export default AdminDashboard;
