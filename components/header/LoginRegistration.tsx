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
import { FC, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";

export enum Nav {
  Register,
  Login,
}

type NavItem = {
  title: string;
  type: Nav.Register | Nav.Login;
  req: string;
};

export const MenuItem: FC<NavItem> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { client } = useMqttState();
  const { message, connectionStatus } = useSubscription("users/authentication");
  const [isIdle, setIsIdle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isAuth = () => {
    return message ? message.message === "success" : false;
  };
  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (topic: string) => {
    const user = {
      email: email,
      password: password,
    };
    client ? client.publish(topic, JSON.stringify(user)) : null;
    setIsIdle(true);
    setTimeout(() => {
      setIsIdle(false);
    }, 5000);
  };

  const color = useColorModeValue("teal.500", "teal.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogin = props.type === Nav.Login;
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
          {props.title}
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>
                {isLogin ? "Login to Your Account" : "Register Your Account"}
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
                <Stack isInline justifyContent="space-between" mt={4}>
                  {isLogin ? (
                    <Box>
                      <Checkbox>Remember Me</Checkbox>
                    </Box>
                  ) : null}
                  <Box>
                    <Link color="teal.500">Forgot your password?</Link>
                  </Box>
                </Stack>
                {/* This is our modal button */}
                <Button
                  // type="submit"
                  onClick={() => handleSubmit(props.req)}
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
                  {isIdle ? null : isLogin ? "Login" : "Register"}
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
