import { Button, Flex } from "@chakra-ui/react";
import { useMqttState } from "mqtt-react-hooks";
import React from "react";

const Test = () => {
  const { client } = useMqttState();
  //const { message, connectionStatus } = useSubscription("frontend");
  const handleClick = (message: any) => {
    return client ? client.publish("users", JSON.stringify(message)) : null;
  };
  return (
    <Flex
      position="relative"
      minH="84vh"
      minW="100vw"
      align="center"
      justify="center">
      {/* For Demo Purposes */}
      <Button onClick={() => handleClick({ message: "from frontend" })}>
        click me
      </Button>
    </Flex>
  );
};

export default Test;
