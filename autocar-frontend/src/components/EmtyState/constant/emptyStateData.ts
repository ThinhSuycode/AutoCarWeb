export const EMPTY_STATE_DATA = {
  users: {
    icon: "fa-solid fa-user-slash",
    title: "Không tìm thấy dữ liệu người dùng",
  },
  cars: {
    icon: "fa-solid fa-car-burst",
    title: "Không tìm thấy dữ liệu xe",
  },
  contacts: {
    icon: "fa-regular fa-folder-open",
    title: "Không có yêu cầu liên hệ nào",
  },
} as const;

export type EmptyStateType = keyof typeof EMPTY_STATE_DATA;
