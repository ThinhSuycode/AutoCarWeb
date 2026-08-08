export const EMPTY_STATE_DATA = {
  users: {
    icon: "fa-solid fa-user-slash",
    title: "Không tìm thấy dữ liệu người dùng",
  },
  cars: {
    icon: "fa-solid fa-car-burst",
    title: "Hiện tại không có dữ liệu",
  },
  contacts: {
    icon: "fa-regular fa-folder-open",
    title: "Không có yêu cầu liên hệ nào",
  },
  articles: {
    icon: "fa-regular fa-newspaper",
    title: "Không tìm thấy bài viết nào",
  },
} as const;

export type EmptyStateType = keyof typeof EMPTY_STATE_DATA;
