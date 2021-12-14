import {
  Heading,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useColorModeValue,
  Box,
  FormLabel,
  Input,
  FormControl,
  Spinner,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";
import store from "../../store";

const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const PERSONAL_NUMBER_REGEX =
  /\b(((20)((0[0-9])|(2[0-2])))|(([1][^0-8])?\d{2}))((0[1-9])|1[0-2])((0[1-9])|(2[0-9])|(3[01]))[-+]?\d{4}[,.]?\b/;

const PHONE_REGEX = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;

export const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validPersonalNumber, setValidPersonalNumber] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [phone, setPhone] = useState("");
  const { client } = useMqttState();
  const { message, connectionStatus } = useSubscription(
    "frontend/users/register",
  );
  //console.log(message)
  const [isIdle, setIsIdle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (message) {
      const t = message.topic;
      if (message.message && t === "frontend/users/register") {
        const data = JSON.parse(message.message as string);
        store.dispatch({ type: "REGISTER", payload: data });
      }
    }
  }, [message]);
  const handleSubmit = (topic: string) => {
    let canCreate = true;
    if (!EMAIL_REGEX.test(email)) {
      canCreate = false;
      setValidEmail(false);
    }
    if (!PASSWORD_REGEX.test(password)) {
      canCreate = false;
      setValidPassword(false);
    }
    if (!PERSONAL_NUMBER_REGEX.test(personalNumber)) {
      canCreate = false;
      setValidPassword(false);
    }
    if (!PHONE_REGEX.test(phone)) {
      canCreate = false;
      setValidPassword(false);
    }

    if (canCreate) {
      client
        ? client.publish(
            topic,
            JSON.stringify({
              email: String(email),
              name: {
                first: String(firstName),
                last: String(lastName),
              },
              personalNumber: personalNumber,
              phone: phone,
              password: String(password),
            }),
          )
        : null;
    }
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
          Register
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>Register Your Account</Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4} textAlign="left">
              <form>
                <FormControl>
                  <FormLabel>
                    Email address{" "}
                    <Text
                      color="red"
                      fontSize="xs"
                      display={validEmail ? "none" : "block"}>
                      Invalid e-mail
                    </Text>
                  </FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>First</FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Last</FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    Personal Number{" "}
                    <Text
                      color="red"
                      fontSize="xs"
                      display={validPersonalNumber ? "none" : "block"}>
                      Invalid formatted personal number
                    </Text>
                  </FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) =>
                      setPersonalNumber(event.currentTarget.value)
                    }
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    Phone Number{" "}
                    <Text
                      color="red"
                      fontSize="xs"
                      display={validPhone ? "none" : "block"}>
                      Invalid phone number
                    </Text>
                  </FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) => setPhone(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    Password{" "}
                    <Text
                      fontSize="xs"
                      color={validPassword ? "gray.400" : "red"}>
                      Minimum eight characters, at least one letter and one
                      number.
                    </Text>
                  </FormLabel>
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
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  onClick={() => handleSubmit("users/register")}
                  colorScheme="teal"
                  width="full"
                  mt={4}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="teal.500"
                    color="orange.500"
                    size="md"
                    display={isIdle ? "block" : "none"}
                  />
                  {isIdle ? null : "Register"}
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
