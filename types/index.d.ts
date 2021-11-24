import { ReactNode } from "react";

export type MyWrapper = {
  children?: ReactNode;
};

export type BookingResponse = {};

export type BookingRequest = {};

export type Dentist = {
  id: number;
  name: string;
  owner: string;
  dentists: number;
  address: string;
  city: string;
  coordinate: {
    longitude: number;
    latitude: number;
  };
  openinghours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  };
};
