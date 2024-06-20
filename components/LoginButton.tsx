"use client";

import React from "react";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      className="bg-primary text-xs hover:bg-sky-700"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Log in
    </Button>
  );
};

export default LoginButton;
