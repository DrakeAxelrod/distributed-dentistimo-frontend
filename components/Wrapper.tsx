import { Container, Flex, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { MyWrapper } from "types";
import { Header } from "./header";
import Footer from "./Footer";

export const Wrapper: FC<MyWrapper> = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Flex
        as="main"
        align="center"
        justify="space-around"
        direction="column"
        h="100%"
        w="100%">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};
