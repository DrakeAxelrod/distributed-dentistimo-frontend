import type { GetStaticProps, NextPage } from "next";
import { Map } from "@components/map";
import { fetcher } from "@lib/utils/fetcher";
import { dentistRegistry } from "@lib/utils/constants";
import { FC } from "react";
import { DentistClinic } from "types";

type Props = {
  clinics: DentistClinic[];
};

// homepage (just has an example component at the moment)
const Home: FC<Props> = ({ clinics }) => {
  return (
    <>
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
