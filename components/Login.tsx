import { Container, Typography, Box } from "@mui/material";
import LoginButton from "./LoginButton";

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
        <LoginButton />
      </Box>
    </Container>
  );
}
