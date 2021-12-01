import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <Box flex="unset">
      <Flex flex="unset">
        <DatePicker
          showTimeSelect
          dateFormat="Pp"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />

        {/* <Button onClick={onOpen}> Push me </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Appointment</ModalHeader>
        <ModalCloseButton />

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}> Close </Button>
        </ModalFooter>
      </ModalContent>
    </Modal> */}
      </Flex>
    </Box>
  );
};
