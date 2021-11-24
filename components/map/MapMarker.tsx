import React, { FC } from "react";
import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Stack,
  Heading,
  Box,
  Image,
  Portal,
  chakra,
} from "@chakra-ui/react";
import { Marker, InfoWindow } from "@react-google-maps/api";

type Props = {
  lat: number;
  lng: number;
  value?: string;
  clinic: {
    name: string;
    owner?: string;
    dentists?: number;
    address: string;
    city?: string;
    openinghours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
    };
  };
};

export const MyMarker: FC<Props> = ({ clinic, lat, lng, value }) => {
  const { name, openinghours, address } = clinic;
  const markerProps = { lat: lat, lng: lng, value: value };
  const monday = openinghours.monday ? openinghours.monday : "Closed";
  const tuesday = openinghours.tuesday ? openinghours.tuesday : "Closed";
  const wednesday = openinghours.wednesday ? openinghours.wednesday : "Closed";
  const thursday = openinghours.thursday ? openinghours.thursday : "Closed";
  const friday = openinghours.friday ? openinghours.friday : "Closed";
  const availSize = "sm";
  return (
    <chakra.div {...markerProps}>
      <Popover placement="right-end">
        <PopoverTrigger>
          <Image
            w="3rem"
            h="3rem"
            aria-label={`pin showing the location of ${clinic.name}`}
            src="/pin.svg"
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize="2xl">
            <Heading fontFamily="Nunito">{name}</Heading>
          </PopoverHeader>
          <PopoverBody>
            <Stack>
              <Text fontSize="md">Address: {address}</Text>
              <Box as="hr" />
              <Heading fontSize="md">Availability</Heading>
              <Text fontSize={availSize}>Monday: {monday}</Text>
              <Text fontSize={availSize}>Tuesday: {tuesday}</Text>
              <Text fontSize={availSize}>Wednesday: {wednesday}</Text>
              <Text fontSize={availSize}>Thursday: {thursday}</Text>
              <Text fontSize={availSize}>Friday: {friday}</Text>
              <Button colorScheme="teal">Book an Appointment</Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </chakra.div>
  );
};
