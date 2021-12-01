import { Flex } from "@chakra-ui/react";
import { Bookings } from "@components/Bookings";
import React from "react";

const Test = () => {
  return (
    <Flex position="relative" minH="84vh" minW="100vw">
      <Bookings />
    </Flex>
  );
};

export default Test;
