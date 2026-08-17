import type { ServiceItem } from "../../../types/service/service.type";

export const ServicesData: ServiceItem[] = [
  {
    id: "maintenance-repair",
    title: "Bảo Dưỡng & Sửa Chữa",
    description:
      "Dịch vụ bảo dưỡng định kỳ và sửa chữa chuyên sâu với trang thiết bị hiện đại.",
    icon: "wrench",
    features: [
      "Bảo dưỡng định kỳ các cấp",
      "Sửa chữa động cơ, hộp số",
      "Thay thế phụ tùng chính hãng",
    ],
    cta: "Tìm hiểu thêm",
  },
  {
    id: "used-car-purchase",
    title: "Thu Mua Xe Cũ",
    description:
      "Thu mua xe ô tô đã qua sử dụng với giá cao nhất thị trường, thủ tục nhanh gọn.",
    icon: "car",
    features: [
      "Định giá miễn phí tận nơi",
      "Thu mua nhanh trong 24h",
      "Thanh toán 100% tiền mặt",
    ],
    cta: "Tìm hiểu thêm",
  },
  {
    id: "installment-consulting",
    title: "Tư Vấn Trả Góp",
    description:
      "Hỗ trợ vay mua xe trả góp với lãi suất ưu đãi từ các ngân hàng uy tín.",
    icon: "credit-card",
    features: [
      "Lãi suất ưu đãi cạnh tranh",
      "Duyệt hồ sơ nhanh trong 2h",
      "Hỗ trợ vay lên đến 80%",
    ],
    cta: "Tìm hiểu thêm",
  },
  {
    id: "vehicle-inspection",
    title: "Kiểm Định Xe",
    description:
      "Dịch vụ kiểm tra chất lượng xe cũ chuyên nghiệp, minh bạch và chi tiết.",
    icon: "clipboard-check",
    features: [
      "Kiểm tra 150 điểm kỹ thuật",
      "Báo cáo tình trạng chi tiết",
      "Cam kết chất lượng bằng văn bản",
    ],
    cta: "Tìm hiểu thêm",
  },
  {
    id: "car-insurance",
    title: "Bảo Hiểm Xe",
    description:
      "Cung cấp các gói bảo hiểm vật chất, trách nhiệm dân sự với quyền lợi tốt nhất.",
    icon: "shield",
    features: [
      "Đa dạng gói bảo hiểm",
      "Chi phí hợp lý, ưu đãi",
      "Hỗ trợ bồi thường nhanh chóng",
    ],
    cta: "Tìm hiểu thêm",
  },
  {
    id: "genuine-parts",
    title: "Phụ Tùng Chính Hãng",
    description:
      "Cung cấp phụ tùng, phụ kiện ô tô chính hãng cho các dòng xe phổ biến.",
    icon: "gear",
    features: [
      "100% phụ tùng chính hãng",
      "Bảo hành dài hạn",
      "Giao hàng và lắp đặt tận nơi",
    ],
    cta: "Tìm hiểu thêm",
  },
];

export const processSteps = [
  {
    step: 1,
    icon: "phone",
    title: "Liên Hệ Tư Vấn",
    desc: "Gọi điện hoặc đặt lịch hẹn trực tuyến để được tư vấn miễn phí.",
  },
  {
    step: 2,
    icon: "calendar",
    title: "Tiếp Nhận & Kiểm Tra",
    desc: "Đội ngũ kỹ thuật viên sẽ kiểm tra tổng quát và báo giá chi tiết.",
  },
  {
    step: 3,
    icon: "hammer",
    title: "Thực Hiện Dịch Vụ",
    desc: "Tiến hành sửa chữa, bảo dưỡng với phụ tùng chính hãng.",
  },
  {
    step: 4,
    icon: "circle-check",
    title: "Bàn Giao Xe",
    desc: "Kiểm tra lần cuối, vệ sinh xe và bàn giao cho khách hàng.",
  },
];
