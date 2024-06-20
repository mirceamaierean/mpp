import React from "react";

type CarDetailsProps = {
  car: {
    make?: string;
    model?: string;
    year?: number;
    color?: string;
    body?: string;
    transmission?: string;
    drivetype?: string;
    fueltype?: string;
    latitude?: number;
    price?: number;
    longitude?: number;
  };
};

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Car Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-medium text-primary">Make:</p>
          <p>{car.make}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Model:</p>
          <p>{car.model}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Year:</p>
          <p>{car.year}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Color:</p>
          <p>{car.color}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Body:</p>
          <p>{car.body}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Transmission:</p>
          <p>{car.transmission}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Drive Type:</p>
          <p>{car.drivetype}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Fuel Type:</p>
          <p>{car.fueltype}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Latitude:</p>
          <p>{car.latitude}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Longitude:</p>
          <p>{car.longitude}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Price:</p>
          <p>€{car.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
