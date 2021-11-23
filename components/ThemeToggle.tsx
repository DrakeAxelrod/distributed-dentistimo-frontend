import {
  useColorMode,
  IconButton,
  useColorModeValue,
  IconButtonProps,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ThemeToggleProps = Omit<IconButtonProps, "aria-label">;

export const ThemeToggle: FC<ThemeToggleProps> = (props) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const ToggleIcon = useColorModeValue(FaMoon, FaSun);
  const color = useColorModeValue("blue.200", "orange.200");

  return (
    <IconButton
      icon={<ToggleIcon fontSize="1.75rem" />}
      _focus={{
        outlineColor: "transparent",
        bgColor: "transparent",
      }}
      mx="0.5rem"
      alignSelf="center"
      variant="ghost"
      color={color}
      aria-label="toggle dark and light mode"
      onClick={toggleMode}
      {...props}
    />
  );
};
