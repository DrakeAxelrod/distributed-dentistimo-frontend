import React, { FC } from "react";
import GoogleMapReact from "google-map-react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  IconProps,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Stack,
} from "@chakra-ui/react";
import { FaTooth } from "react-icons/fa";


type MarkerProps = {
  lat: number;
  lng: number;
  value?: string;
};

const Marker: FC<MarkerProps> = (props) => {
  return (
    <div {...props}>
      {/* <IconButton
        background="transparent"
        _hover={{
          background: "transparent",
        }}
        _active={{
          background: "transparent",
        }}
        aria-label="label"
        as="a"
        icon={<Icon as={FaTooth} h="2rem" w="2rem" />}
        color="teal.500"
        {...props}
      /> */}
      <Popover>
        <PopoverTrigger>
          <IconButton
            background="transparent"
            _hover={{
              background: "transparent",
            }}
            _active={{
              background: "transparent",
            }}
            aria-label="label"
            as="a"
            icon={
              <Icon
                as={FaTooth}
                h="2rem"
                w="2rem"
                _hover={{
                  h: "2.25rem",
                  w: "2.25rem",
                }}
              />
            }
            color="teal.500"
            {...props}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontSize="lg">This is the Clinic yo</PopoverHeader>
          <PopoverBody fontSize="lg">
            <Stack>
              <Text>Clinic Information yo</Text>
              <Button colorScheme="teal">Book an Appointment</Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}


export const Map = () => {
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
    <Flex h="84vh" w="100%" borderRadius="large" border="1rem">
      <GoogleMapReact
        bootstrapURLKeys={{ key: api }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
        <Marker lat={57.7089} lng={11.9746} value="demo clinic" />
      </GoogleMapReact>
    </Flex>
  );
};
