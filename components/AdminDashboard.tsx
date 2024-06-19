"use client";
import React from "react";
import { useState } from "react";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import AdminDrawer from "./AdminDrawer";
import { User } from "@prisma/client";

const drawerWidth = 240;

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
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminDrawer
          user={user}
          setCarsTable={setCarsTable}
          setRentalsTable={setRentalsTable}
          setStatsTable={setStatsTable}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>Content goes here.</Typography>
        </Box>
      </Box>
    </>
  );
}

export default AdminDashboard;
