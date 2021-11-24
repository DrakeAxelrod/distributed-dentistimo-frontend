import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { RiCopyrightLine } from "react-icons/ri";
import { GoPrimitiveDot } from "react-icons/go";

export const Copyright: FC = () => {
  const color = useColorModeValue("teal.500", "teal.100");
  return (
    <Flex
      as="p"
      align="center"
      fontWeight={900}
      fontSize={["1rem", "2rem"]}
      color={color}
      fontFamily="Nunito">
      <Icon as={RiCopyrightLine} />
      <Text as="span" pr="0.25rem">
        &nbsp;
        {new Date().getFullYear()}
      </Text>
      <Icon as={GoPrimitiveDot} w="0.75rem" h="0.75rem" />
      <Text as="span" pl="0.25rem">
        Group 16
      </Text>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Box as="footer">
      <Flex
        h="8vh"
        w="full"
        maxH="8vh"
        minW="full"
        align="center"
        justify="center">
        <Copyright />
      </Flex>
    </Box>
  );
};

export default Footer;
