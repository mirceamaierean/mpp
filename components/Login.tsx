"use client";

import { Button, Container, Typography, Box } from "@mui/material";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="20vh"
        gap={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome!
        </Typography>
        <Button
          variant="contained"
          className="bg-primary"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="52 42 88 66"
              width="30"
              height="30"
            >
              <path
                fill="#4285f4"
                d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
              />
              <path
                fill="#34a853"
                d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
              />
              <path
                fill="#fbbc04"
                d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
              />
              <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
              <path
                fill="#c5221f"
                d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
              />
            </svg>
          }
          onClick={() => signIn("google", { callbackUrl: "/dashboard/cars" })}
        >
          Log in with Gmail
        </Button>
      </Box>
    </Container>
  );
}
