import type { ServiceAppointmentKey } from "../../constants/serviceData";
import type { OptionType } from "../common/option.type";

export interface ShowroomType {
  id: string;

  name: string;

  city: string;

  address: string;

  phone: string;

  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };

  image: string;

  features: string[];

  mapUrl: string;
}

export type ServiceAppointmentItem = OptionType<ServiceAppointmentKey>;
