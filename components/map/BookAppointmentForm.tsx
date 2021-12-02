import {
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useColorModeValue,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";
import Calendar from "react-calendar";
import { Global } from "@emotion/react";
import style from "@styles/calender";

export const BookAppointmentForm: FC = () => {
  const { client } = useMqttState();
  const [isIdle, setIsIdle] = useState(false);
  const color = useColorModeValue("teal.500", "teal.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Global styles={style} />
      <Button onClick={onOpen} colorScheme="teal">
        Book Appointment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>Appointment Booking</Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Calendar />
            <Button
              my="1rem"
              onClick={() => {}}
              colorScheme="teal"
              width="full"
              mt={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="teal.500"
                color="orange.500"
                size="md"
                display={false ? "block" : "none"}
              />
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
