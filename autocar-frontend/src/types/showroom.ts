export type ShowroomType = {
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
};
export interface WhyVisitType {
  id: number;
  icon: string;
  title: string;
  description: string;
}
