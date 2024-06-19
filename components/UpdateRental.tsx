"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Button, FormControl } from "@mui/base";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Rental } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateRentalInDB } from "@/service/RentalsService";
import { getCheapestCarburantInCity } from "@/service/PriceService";
type Props = {
  rental: Rental;
};

function UpdateRentalForm(rental: Rental) {
  const carId = rental.carid;
  const [value, setValue] = useState(rental.value);
  const [startDate, setStartDate] = useState<Date>(new Date(rental.startdate));
  const [endDate, setEndDate] = useState<Date>(new Date(rental.enddate));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value <= 0) {
      toast.error("Value must be greater than 0", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (startDate > endDate) {
      toast.error("Start date must be before end date", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const res = await updateRentalInDB({
      id: rental.id,
      value,
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
    } as Rental);

    if (res.status === 400) {
      toast.warn("Failed to update car", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    toast.success("Rental has been updated!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
        <InputLabel>Car ID</InputLabel>
        <Input value={carId} disabled />
        <InputLabel>Location</InputLabel>
        <Input value={rental.city} disabled />
        <InputLabel>Value</InputLabel>
        <Input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <InputLabel>Start Date</InputLabel>
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate.toISOString().split("T")[0]}
          onChange={(e) => {
            setStartDate(new Date(e.target.value));
          }}
        />
        <InputLabel>End Date</InputLabel>
        <Input
          type="date"
          placeholder="End Date"
          value={endDate.toISOString().split("T")[0]}
          onChange={(e) => {
            setEndDate(new Date(e.target.value));
          }}
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        className="bg-primary text-white w-full py-2 rounded-md mt-4"
      >
        Update Rental
      </Button>
    </FormControl>
  );
}

export default function UpdateRentalModal({ rental }: Props) {
  const [price, setPrice] = useState<number>(0);
  const [provider, setProvider] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  useEffect(() => {
    const fetchGasStation = async () => {
      if (rental.city) {
        const gasStation = await getCheapestCarburantInCity(rental.city);
        setPrice(gasStation.price);
        setProvider(gasStation.provider);
        setLocation(gasStation.location);
      }
    };
    fetchGasStation();
  }, []);
  return (
    <>
      <Box className="mx-auto transform w-96 sm:w-[700px] bg-white p-4 rounded-lg pt-20">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="pb-4"
        >
          Update Rental Information
        </Typography>
        {price > 0 && (
          <Typography variant="body1" component="p" className="pb-4">
            Carburant in {location} is provided by {provider} at the price of{" "}
            {price} lei/L, which is the cheapest in the city.
          </Typography>
        )}
        <UpdateRentalForm {...rental} />
      </Box>
      <ToastContainer />
    </>
  );
}
