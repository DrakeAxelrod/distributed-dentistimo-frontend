import React, { FC } from "react";
import GoogleMapReact from "google-map-react";
import { Box, Flex } from "@chakra-ui/react";
import { MyMarker } from "./MapMarker";
import { DentistClinic } from "types";

type Props = {
  clinics?: DentistClinic[];
};

export const Map: FC<Props> = ({ clinics }) => {
  const key = process.env.GOOGLE_MAP_API;
  const api = key ? key : "";
  const defaultProps = {
    center: {
      lat: 57.7089,
      lng: 11.9746,
    },
    zoom: 12,
  };
  return (
    <Flex minW="100vw">
      <GoogleMapReact
        bootstrapURLKeys={{ key: api }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
        {clinics?.map((clinic, index) => (
          <MyMarker
            key={index}
            lat={clinic.coordinate.latitude}
            lng={clinic.coordinate.longitude}
            value={clinic.name}
            clinic={clinic}
          />
        ))}
      </GoogleMapReact>
    </Flex>
  );
};
