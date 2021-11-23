import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { MyWrapper } from "types";
import { Header } from "@components/Header";
import Footer from "./Footer";

export const Wrapper: FC<MyWrapper> = ({ children }) => {
  return (
    <>
      <Header />
      <Flex flexGrow={1} direction="row" w="full" h="full" justify="center">
        {children}
      </Flex>
      <Footer />
    </>
  );
};
