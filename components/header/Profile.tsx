import {
  Heading,
  Button,
  Text,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useColorModeValue,
  Box,
  Link,
  FormLabel,
  Input,
  Checkbox,
  FormControl,
  Spinner,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";
import store from "../../store";

export const Profile: FC = () => {
  const user = store.getState();
  const { message, connectionStatus } = useSubscription([
    "frontend/users/login",
  ]);
  const [userName, setUserName] = useState(user.name.first);

  const [isIdle, setIsIdle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = () => {
    store.dispatch({
      type: "LOGOUT",
      payload: {
        _id: "",
        email: "",
        name: {
          first: "",
          last: "",
        },
        personalNumber: "",
        phone: "",
      },
    });
  };
  const color = useColorModeValue("teal.500", "teal.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        color={color}
        p={["0.25rem", "1rem"]}
        _hover={{
          background: "transparent",
          outline: "transparent",
        }}
        _active={{
          background: "transparent",
          outline: "transparent",
        }}>
        <Text fontSize={["1rem", "2rem"]} fontFamily="Nunito" color={color}>
          {userName || ""}
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>{`${userName}'s Profile`}</Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4} textAlign="left">
              <form>
                <FormControl>
                  <FormLabel>{`Email: ${user.email}`}</FormLabel>
                  {/* <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  /> */}
                </FormControl>
                <FormControl>
                  <FormLabel>{`first: ${user.name.first}`}</FormLabel>
                  <FormLabel>{`last: ${user.name.last}`}</FormLabel>
                  {/* <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  /> */}
                </FormControl>
                <FormControl>
                  <FormLabel>{`Personal Number: ${user.personalNumber}`}</FormLabel>
                  {/* <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  /> */}
                </FormControl>
                <FormControl>
                  <FormLabel>{`Phone Number: ${user.phone}`}</FormLabel>
                  {/* <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  /> */}
                </FormControl>
                {/* <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      isDisabled={isIdle}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />

                    <InputRightElement width="4.5rem">
                      <Button
                        variant="ghost"
                        fontFamily="Nunito"
                        h="1.75rem"
                        size="md"
                        _hover={{
                          background: "transparent",
                        }}
                        _active={{
                          background: "transparent",
                          outline: "transparent",
                        }}
                        _focus={{
                          background: "transparent",
                          outline: "transparent",
                        }}
                        onClick={handlePasswordShow}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement> */}
                {/* </InputGroup>
                </FormControl> */}
                {/* This is our modal button */}
                <Button
                  // type="submit"
                  onClick={() => handleSubmit()}
                  colorScheme="teal"
                  width="full"
                  mt={4}>
                  logout
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
