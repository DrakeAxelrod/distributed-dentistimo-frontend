import {
  Flex,
  Icon,
  Heading,
  Spacer,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FaTooth } from "react-icons/fa";
import { ThemeToggle } from "../ThemeToggle";
import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import store from "../../store";

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
        Dentistimo
      </Heading>
    </Flex>
  );
};

const MenuItems: FC = () => {
  const [loggedIn, setLoggedIn] = useState(store.getState()._id !== "");
  const unsubscribe = store.subscribe(() => {
    if (store.getState()._id !== "") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  if (loggedIn) {
    return (
      <Box>
        <Profile />
      </Box>
    );
  } else {
    return (
      <Box>
        <Login />
        <Register />
      </Box>
    );
  }
};

export const Header: FC = () => {
  // const [loggedIn, setLoggedIn] = useState(store.getState()._id !== "");
  // const unsubscribe = store.subscribe(() => {
  //   if (store.getState()._id !== "") {
  //     console.log("here")
  //     setLoggedIn(true)
  //   } else {
  //     setLoggedIn(false);
  //   }
  // })
  return (
    <Box as="header" m="0" p="0">
      <Flex h="8vh" maxH="8vh" minW="100%">
        <Logo />
        <Spacer />
        <Flex direction="row" align="center" pr="0.5rem">
          <MenuItems />
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
};
