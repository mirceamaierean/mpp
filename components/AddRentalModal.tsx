"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, FormControl } from "@mui/base";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCarToDB } from "@/service/CarsApi";
import { addRentalToDB } from "@/service/RentalsApi";

type Props = {
  carId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function AddRentalForm({
  setOpen,
  carId,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  carId: number;
}) {
  const [value, setValue] = useState(0);
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date>(currentDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await addRentalToDB({
      carid: carId,
      value,
      startdate: startDate?.toISOString(),
      enddate: endDate?.toISOString(),
    });

    if (res.status === 400) {
      toast.warn("Failed to add rental", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    toast.success("Rental has been registered!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setOpen(false);
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
        <InputLabel>Car ID</InputLabel>
        <Input placeholder="Car ID" value={carId} disabled={true} />
        <InputLabel>Value</InputLabel>
        <Input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <InputLabel>Start Date</InputLabel>
        <Input
          type="date"
          placeholder="Start Date"
          onChange={(e) => {
            setStartDate(new Date(e.target.value));
          }}
        />
        <InputLabel>End Date</InputLabel>
        <Input
          type="date"
          placeholder="End Date"
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
        Submit
      </Button>
    </FormControl>
  );
}

export default function AddRentalModal({ open, setOpen, carId }: Props) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[40%] sm:top-[25%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]  w-96 sm:w-[700px] bg-white p-4 rounded-lg">
        <CloseIcon
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 cursor-pointer m-4"
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="pb-4"
        >
          Add Contract
        </Typography>
        <AddRentalForm setOpen={setOpen} carId={carId} />
      </Box>
    </Modal>
  );
}
