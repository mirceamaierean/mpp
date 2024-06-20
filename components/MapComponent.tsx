"use client";

import React, { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const defaultMapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "15px",
};

const defaultMapZoom = 18;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

export interface MapComponentProp {
  latitude: number;
  longitude: number;
  label: string;
}

interface MapComponentProps {
  sampleLocations: MapComponentProp[];
}

const MapComponent: React.FC<MapComponentProps> = ({ sampleLocations }) => {
  const markers = useMemo(
    () =>
      sampleLocations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.latitude, lng: location.longitude }}
          label={{
            text: location.label,
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: "bold",
            className: "custom-marker-label",
          }}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // You can use your own custom icon URL
            scaledSize: new google.maps.Size(40, 40), // Adjust the size as needed
          }}
        />
      )),
    [sampleLocations],
  );

  return (
    <div className="w-full pt-16">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={{
          lat: sampleLocations[0]?.latitude || 0,
          lng: sampleLocations[0]?.longitude || 0,
        }}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {markers}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
