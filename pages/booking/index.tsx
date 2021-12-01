import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const myEvents = [
  {
    title: "my event",
    start: new Date(2021, 12, 3),
    end: new Date(2021, 12, 4),
  },
];

const MyCalendar = () => {
  const start = new Date();
  return (
    <Flex position="relative" minH="84vh" minW="100vw">
      <Calendar
        // toolbar={false}
        // tooltipAccessor={false}
        onView={() => {}}
        defaultView="month"
        views={{ month: true }}
        localizer={localizer}
        events={myEvents}
        style={{
          fontFamily: "Nunito",
          fontSize: "3rem",
          height: "100%",
          width: "100%",
        }}
      />
    </Flex>
  );
};

const Booking: FC = () => {
  return (
    <Flex position="relative" minH="84vh" minW="100vw">
      <MyCalendar />
    </Flex>
  );
};

export default Booking;
