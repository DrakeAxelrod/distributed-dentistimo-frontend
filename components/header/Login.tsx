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
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";
import store from "../../store";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const { client } = useMqttState();
  const { message, connectionStatus } = useSubscription([
    "frontend/users/login",
  ]);

  const [isIdle, setIsIdle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (message) {
      const t = message.topic;
      if (message.message && t === "frontend/users/login") {
        const data = JSON.parse(message.message as string);
        if (data.authenticated === false) {
          setPassMsg(data.message);
        } else {
          store.dispatch({
            type: "LOGIN",
            payload: data.message,
          });
        }
      }
    }
  }, [message]);
  const handleSubmit = (topic: string) => {
    client
      ? client.publish(
          topic,
          JSON.stringify({
            email: email,
            password: password,
          }),
        )
      : null;
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
          Login
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>
                Login to Your Account{" "}
                <Text fontSize="xs" color={"red"}>
                  {passMsg}
                </Text>
              </Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4} textAlign="left">
              <form>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    isDisabled={isIdle}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl mt={4}>
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
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {/* <Stack isInline justifyContent="space-between" mt={4}>
                  <Box>
                    <Checkbox defaultIsChecked={rememberMe} >Remember Me</Checkbox>
                  </Box>
                  <Box>
                    <Link color="teal.500">Forgot your password?</Link>
                  </Box>
                </Stack> */}
                {/* This is our modal button */}
                <Button
                  // type="submit"
                  onClick={() => handleSubmit("users/login")}
                  colorScheme="teal"
                  width="full"
                  mt={4}>
                  Login
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
