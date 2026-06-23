import type {
  BannerData,
  serviceAppointmentType,
  ShowroomType,
} from "../../../types/showroom";
import imgBanner from "../../../assets/img/showroom1.jpg";

export const imgBannerData: BannerData[] = [
  {
    id: "0",
    image: imgBanner,
  },
  {
    id: "1",
    image:
      "https://mercedes-car.com.vn/wp-content/uploads/2024/12/468451206_973816074787334_1772688189996260861_n-1.jpg",
  },
  {
    id: "2",
    image:
      "https://mercedes-car.com.vn/wp-content/uploads/2025/08/536476095_1177021211133485_610407650316454869_n.jpg",
  },
  {
    id: "3",
    image:
      "https://mercedes-car.com.vn/wp-content/uploads/2022/09/banner-pc.jpg",
  },
];

export const serviceAppointment: serviceAppointmentType[] = [
  {
    id: "test_drive",
    label: "Lái thử xe",
  },
  {
    id: "consultation",
    label: "Tư vấn",
  },
  {
    id: "maintenance",
    label: "Bảo dưỡng",
  },
  {
    id: "inspection",
    label: "Kiểm định",
  },
];

export const showrooms: ShowroomType[] = [
  {
    id: "hcm",
    name: "AutoViet Sài Gòn",
    city: "TP. Hồ Chí Minh",
    address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    phone: "0901 234 567",
    hours: {
      weekday: "8:00 - 18:00",
      saturday: "8:00 - 17:00",
      sunday: "9:00 - 15:00",
    },
    image:
      "https://images.unsplash.com/photo-1562519819-016930ada31b?w=1200&auto=format&fit=crop&q=80",
    features: [
      "200+ xe trưng bày",
      "Khu vực lái thử",
      "Phòng tư vấn riêng",
      "Bãi đỗ xe rộng rãi",
    ],
    mapUrl: "#",
  },
  {
    id: "hn",
    name: "AutoViet Hà Nội",
    city: "Hà Nội",
    address: "456 Phạm Hùng, Quận Cầu Giấy, Hà Nội",
    phone: "0902 345 678",
    hours: {
      weekday: "8:00 - 18:00",
      saturday: "8:00 - 17:00",
      sunday: "9:00 - 15:00",
    },
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&auto=format&fit=crop&q=80",
    features: [
      "150+ xe trưng bày",
      "Khu vực lái thử",
      "Xưởng bảo dưỡng",
      "Cafe thư giãn",
    ],
    mapUrl: "#",
  },
  {
    id: "dn",
    name: "AutoViet Đà Nẵng",
    city: "Đà Nẵng",
    address: "789 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng",
    phone: "0903 456 789",
    hours: {
      weekday: "8:00 - 18:00",
      saturday: "8:00 - 17:00",
      sunday: "9:00 - 15:00",
    },
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=80",
    features: [
      "100+ xe trưng bày",
      "Khu vực lái thử",
      "Dịch vụ tận tâm",
      "View biển đẹp",
    ],
    mapUrl: "#",
  },
];
export const whyVisitData = [
  {
    id: 1,
    icon: "fa-car-side",
    title: "Lái Thử Miễn Phí",
    description:
      "Trải nghiệm thực tế với xe bạn quan tâm trước khi quyết định mua",
  },
  {
    id: 2,
    icon: " fa-user-group",
    title: "Tư Vấn Chuyên Nghiệp",
    description:
      "Đội ngũ tư vấn giàu kinh nghiệm, nhiệt tình hỗ trợ bạn chọn xe phù hợp",
  },
  {
    id: 3,
    icon: "fa-medal",
    title: "Ưu Đãi Đặc Biệt",
    description:
      "Nhiều chương trình khuyến mãi hấp dẫn dành riêng cho khách đến showroom",
  },
];
