import type { ShowroomType } from "../../types/showroom";

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
