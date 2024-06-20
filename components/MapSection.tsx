"use client";
import React, { useEffect, useState } from "react";
import { MapProvider } from "./MapProvider";
import { MapComponent, MapComponentProp } from "./MapComponent";
import { getCoordinatesForCars } from "@/service/CarsService";

const MapSection: React.FC = () => {
  const [sampleLocations, setSampleLocations] = useState<MapComponentProp[]>(
    [],
  );

  useEffect(() => {
    const fetchCarCoordinates = async () => {
      const cars = await getCoordinatesForCars();
      const locations: MapComponentProp[] = cars.map((car) => ({
        latitude: car.latitude as number,
        longitude: car.longitude as number,
        label: `${car.make} ${car.model}`,
      }));
      setSampleLocations(locations);
    };

    fetchCarCoordinates();
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <MapProvider>
      <MapComponent sampleLocations={sampleLocations} />
    </MapProvider>
  );
};

export default MapSection;
