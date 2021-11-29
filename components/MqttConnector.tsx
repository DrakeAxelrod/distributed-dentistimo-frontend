import { Connector } from "mqtt-react-hooks";
import React, { FC } from "react";
import { MyWrapper } from "types";

export const MqttConnector: FC<MyWrapper> = ({ children }) => {
  return (
    <Connector
      brokerUrl={process.env.BROKER_URI}
      options={{
        username: process.env.BROKER_USERNAME,
        password: process.env.BROKER_PASSWORD,
        protocol: "ws",
        port: 80,
      }}>
      {children}
    </Connector>
  );
};
