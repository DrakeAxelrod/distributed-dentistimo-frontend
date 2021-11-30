import {
  Flex,
  Icon,
  Heading,
  Spacer,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaTooth } from "react-icons/fa";
import { ThemeToggle } from "../ThemeToggle";
import { MenuItem, Nav } from "./LoginRegistration";

const Logo: FC = () => {
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

export const NavItems = [
  {
    title: "Login",
    type: Nav.Login,
    req: "users/login",
  },
  {
    title: "Register",
    type: Nav.Register,
    req: "users/register",
  },
];

export const Header: FC = () => {
  return (
    <Box as="header" m="0" p="0">
      <Flex h="8vh" maxH="8vh" minW="100%">
        <Logo />
        <Spacer />
        <Flex direction="row" align="center" pr="0.5rem">
          {NavItems.map(({ title, type, req }, index) => (
            <MenuItem key={index} title={title} type={type} req={req} />
          ))}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};
