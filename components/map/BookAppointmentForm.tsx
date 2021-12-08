import {
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useColorModeValue,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useMqttState, useSubscription, IMessage } from "mqtt-react-hooks";
import Calendar from "react-calendar";
import { Global } from "@emotion/react";
import style from "@styles/calender";
// activeStartDate?: Date | undefined;
// allowPartialRange?: boolean | undefined;
// calendarType?: CalendarType | undefined;
// className?: string | string[] | undefined;
// closeCalendar?: boolean | undefined;
// defaultActiveStartDate?: Date | undefined;
// defaultValue?: Date | Date[] | undefined;
// defaultView?: Detail | undefined;
// formatDay?: FormatterCallback | undefined;
// formatLongDate?: FormatterCallback | undefined;
// formatMonth?: FormatterCallback | undefined;
// formatMonthYear?: FormatterCallback | undefined;
// formatShortWeekday?: FormatterCallback | undefined;
// formatYear?: FormatterCallback | undefined;
// inputRef?: ((
//     ref: HTMLInputElement | null,
// ) => void) | RefObject<HTMLInputElement> | MutableRefObject<HTMLInputElement | null> | undefined;
// locale?: string | undefined;
// maxDate?: Date | undefined;
// maxDetail?: Detail | undefined;
// minDate?: Date | undefined;
// minDetail?: Detail | undefined;
// navigationAriaLabel?: string | undefined;
// navigationLabel?: ((props: {
//     date: Date;
//     label: string;
//     locale: string;
//     view: Detail;
// }) => string | JSX.Element | null) | undefined;
// nextAriaLabel?: string | undefined;
// nextLabel?: string | JSX.Element | null | undefined;
// next2AriaLabel?: string | undefined;
// next2Label?: string | JSX.Element | null | undefined;
// onActiveStartDateChange?: ViewCallback | undefined;
// onChange?: OnChangeDateCallback | OnChangeDateRangeCallback | undefined;
// onViewChange?: ViewCallback | undefined;
// onClickDay?: DateCallback | undefined;
// onClickDecade?: DateCallback | undefined;
// onClickMonth?: DateCallback | undefined;
// onClickWeekNumber?: ClickWeekNumberCallback | undefined;
// onClickYear?: DateCallback | undefined;
// onDrillDown?: DrillCallback | undefined;
// onDrillUp?: DrillCallback | undefined;
// prevAriaLabel?: string | undefined;
// prevLabel?: string | JSX.Element | null | undefined;
// prev2AriaLabel?: string | undefined;
// prev2Label?: string | JSX.Element | null | undefined;
// returnValue?: "start" | "end" | "range" | undefined;
// showDoubleView?: boolean | undefined;
// showFixedNumberOfWeeks?: boolean | undefined;
// showNavigation?: boolean | undefined;
// showNeighboringMonth?: boolean | undefined;
// selectRange?: boolean | undefined;
// showWeekNumbers?: boolean | undefined;
// tileClassName?: string | string[] | ((props: CalendarTileProperties) => string | string[] | null) | undefined;
// tileContent?: string | JSX.Element | ((props: CalendarTileProperties) => JSX.Element | null) | undefined;
// tileDisabled?: ((props: CalendarTileProperties) => boolean) | undefined;
// value?: Date | Date[] | null | undefined;
// view?: Detail | undefined;
type Props = {
  lat: number;
  lng: number;
  value?: string;
  clinic: {
    name: string;
    owner?: string;
    dentists?: number;
    address: string;
    city?: string;
    openinghours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
    };
  };
};
export const BookAppointmentForm: FC<Props> = (props) => {
  const { client } = useMqttState();
  const [isIdle, setIsIdle] = useState(false);
  const { message, connectionStatus } = useSubscription(
    "frontend/bookings/all",
  );
  const color = useColorModeValue("teal.500", "teal.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const future = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  const onChange = (selectedItem: Date) => {
    // console.log({
    //   day: selectedItem.getDate(),
    //   month: selectedItem.getMonth() + 1,
    //   year: selectedItem.getFullYear(),
    // });
    client
      ? client.publish(
          "bookings/all",
          JSON.stringify({
            clinic: props.clinic,
            date: {
              dayName: selectedItem.toLocaleDateString("en-US", {
                weekday: "long",
              }),
              day: selectedItem.getDate(),
              month: selectedItem.getMonth() + 1,
              year: selectedItem.getFullYear(),
            },
          }),
        )
      : null;
    setTimeout(() => {
      if (connectionStatus) {
        if (message) {
          const msg = message.message ? message.message : "{}";
          const data = JSON.parse(msg as string);
          console.log(data);
          if (data === {}) {
            return;
          } else {
            return;
          }
        }
      }
    }, 1000);
  };
  return (
    <>
      <Global styles={style} />
      <Button onClick={onOpen} colorScheme="teal">
        Book Appointment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader pt="3rem" pb="0rem">
            <Box textAlign="center">
              <Heading>Appointment Booking</Heading>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Calendar
              activeStartDate={new Date()}
              minDate={new Date()}
              maxDate={future}
              onChange={onChange}
            />
            <Text>availble appointment</Text>
            <Button
              my="1rem"
              onClick={() => {}}
              colorScheme="teal"
              width="full"
              mt={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="teal.500"
                color="orange.500"
                size="md"
                display={false ? "block" : "none"}
              />
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
