import {
  Flex,
  Icon,
  Heading,
  Button,
  Spacer,
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
} from "@chakra-ui/react";
import { FC } from "react";
import { FaTooth } from "react-icons/fa";
import { LoginForm } from "./Login";
import { ThemeToggle } from "./ThemeToggle";

enum Nav {
  Register,
  Login,
}

type NavItem = {
  title: string;
  type: Nav.Register | Nav.Login;
};
const NavItems = [
  {
    title: "Login",
    type: Nav.Login,
  },
  {
    title: "Register",
    type: Nav.Register,
  },
];

const MenuItem: FC<NavItem> = (props) => {
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
                  <Input type="email" placeholder="Enter your email address" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" />
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

                <Button colorScheme="teal" width="full" mt={4}>
                  {isLogin ? "Login" : "Register"}
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Logo = () => {
  const color = useColorModeValue("teal.500", "teal.100");
  return (
    <Flex align="center">
      <Box pl="1rem" />
      <Icon
        w={["1rem", "2rem"]}
        h={["1rem", "2rem"]}
        as={FaTooth}
        color={color}
      />
      <Heading
        as="h1"
        pl="0.5rem"
        fontFamily="Nunito"
        color={color}
        fontSize={["1rem", "2rem"]}>
        {"Dentistimo"}
      </Heading>
    </Flex>
  );
};

export const Header = () => {
  return (
    <Box as="header" m="0" p="0">
      <Flex h="8vh" maxH="8vh" minW="100%">
        <Logo />
        <Spacer />
        <Flex direction="row" align="center" pr="0.5rem">
          {NavItems.map(({ title, type }, index) => (
            <MenuItem key={index} title={title} type={type} />
          ))}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};
