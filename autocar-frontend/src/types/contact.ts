// types/contact.ts
export interface Contact {
  // Thông tin người liên hệ
  name: string;
  phone: string;
  message?: string;

  // Liên kết xe & người bán
  carId: string;
  carName: string;
  sellerId: string;

  // Người gửi (nếu đã đăng nhập)
  buyerId?: string;

  status: "pending" | "contacted" | "done" | "cancelled";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BannerContact {
  icon: string;
  heading: string;
  desc: {
    desc1: string;
    desc2: string;
  };
}

export interface QuestionContact {
  title: string;
  content: string;
}
