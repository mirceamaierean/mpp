import { Car } from "@/types/types";
import { Card, CardContent, Typography } from "@mui/material";

interface CarInfoProps {
  car: Car | null;
}

export default function CarInfo({ car }: CarInfoProps) {
  if (!car) return null;

  return (
    <div className="mt-4 max-w-6xl mx-auto">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {car.make}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Model: {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {car.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fuel Type: {car.fuelType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Color: {car.color}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
