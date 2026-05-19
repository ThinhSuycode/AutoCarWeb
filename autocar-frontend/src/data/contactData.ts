import type { BannerContact, QuestionContact } from "../types/contact";

export const BannerContactData: BannerContact[] = [
  {
    icon: "fa-solid fa-location-dot",
    heading: "Địa chỉ ShowRoom",
    desc: 
    {
      desc1:"123 Nguyễn Văn Linh",
      desc2:"Quận 7, TP. Hồ Chí Minh"
    },
  },
  {
    icon: "fa-solid fa-phone-volume",
    heading: "Điện thoại",
    desc: 
     {
      desc1:"Hotline: 0901 234",
      desc2:"Kinh doanh: 0902 345 678"
    },
  },
  {
    icon: "fa-regular fa-envelope",
    heading: "Email",
    desc: 
     {
      desc1:"info@autoviet.vn",
      desc2:"support@autoviet.vn"
    },
  },
  {
    icon: "fa-regular fa-clock",
    heading: "Giờ làm việc",
    desc:
     {
      desc1:"Thứ 2 - Thứ 7: 8:00 - 18:00",
      desc2:" Chủ nhật: 9:00 - 17:00"
    },
  },
];

export const questionContactData: QuestionContact[] = [
  {
    title: "Làm thế nào để đặt lịch lái thử xe?",
    content:
      "Bạn có thể dễ dàng đặt lịch lái thử bằng cách điền vào form liên hệ trên trang này, gọi trực tiếp đến số Hotline, hoặc đến trực tiếp showroom của chúng tôi. Nhân viên tư vấn sẽ sắp xếp xe và thời gian phù hợp nhất cho bạn.",
  },
  {
    title: "AutoViet có hỗ trợ mua xe trả góp không?",
    content:
      "Có, chúng tôi liên kết với nhiều ngân hàng lớn để hỗ trợ khách hàng mua xe trả góp với lãi suất ưu đãi, thủ tục nhanh gọn và tỷ lệ duyệt hồ sơ cao. Hỗ trợ vay lên đến 80% giá trị xe.",
  },
  {
    title: "Chính sách bảo hành của AutoViet như thế nào?",
    content:
      "Tất cả các xe bán ra tại AutoViet đều được hưởng chính sách bảo hành chính hãng. Ngoài ra, đối với xe qua sử dụng, chúng tôi cung cấp gói bảo hành riêng từ 6 tháng đến 1 năm cho động cơ và hộp số.",
  },
  {
    title: "Tôi có thể bán lại xe cũ cho AutoViet không?",
    content:
      "Chắc chắn rồi. Chúng tôi có chương trình Thu cũ đổi mới với mức giá thu mua cạnh tranh nhất thị trường. Đội ngũ kỹ thuật viên sẽ thẩm định xe tận nơi và báo giá nhanh chóng trong vòng 30 phút.",
  },
];
