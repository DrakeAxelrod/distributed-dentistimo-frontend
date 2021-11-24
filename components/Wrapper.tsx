import { Flex, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { MyWrapper } from "types";
import { Header } from "@components/Header";
import Footer from "./Footer";

export const Wrapper: FC<MyWrapper> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" minW="100vw">
      <Header />
      <Flex minH="84vh" minW="100vw">
        {children}
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};
