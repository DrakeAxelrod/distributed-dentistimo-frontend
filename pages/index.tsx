import type { GetStaticProps, NextPage } from "next";
import { Map } from "@components/map";
import { fetcher } from "@lib/utils/fetcher";
import { dentistRegistry } from "@lib/utils/constants";
import { FC, useEffect, useState } from "react";
import { DentistClinic } from "types";
import { useSubscription, useMqttState } from "mqtt-react-hooks";

type Props = {
  clinics: DentistClinic[];
};

// homepage (just has an example component at the moment)
const Home: FC<Props> = ({ clinics }) => {
  // for demo purposes
  const { client } = useMqttState();
  const { message, connectionStatus } = useSubscription("test");
  const handleClick = (message: any) => {
    return client ? client.publish("test", message) : null;
  };
  return (
    <>
      {/* For Demo Purposes */}
      {/* <button type="button" onClick={() => handleClick("yoyoyo")}>
        click me
      </button>
      <span>{connectionStatus}</span>
      <hr />
      <span>{JSON.stringify(message)}</span> */}
      <Map clinics={clinics} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { dentists } = await fetcher(dentistRegistry.dentists);
  const clinics = dentists;
  return {
    props: {
      clinics,
    },
  };
};
export default Home;
