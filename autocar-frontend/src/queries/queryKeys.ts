export const queryKeys = {
  dashboard: {
    all: ["users", "cars", "appoinments", "artciles"],
  },
  car: {
    all: ["cars"] as const,
    list: (params: { page: number; limit: number; search: string }) =>
      ["cars", "list", params] as const,
    detail: (id: string) => ["cars", id] as const,
  },

  managerCar: {
    all: ["manager-cars"] as const,
    list: (params: { page: number; limit: number; hasManager?: string }) =>
      ["manager-cars", params] as const,
  },

  user: {
    all: ["users"] as const,
    staff: ["users", "staff"] as const,
    admin: ["users", "admin"] as const,

    list: (params: {
      page: number;
      limit: number;
      search?: string;
      role?: string;
    }) => ["users", "list", params],
    me: ["me"] as const,
  },

  article: {
    all: ["articles"] as const,

    detail: (id: string) => ["articles", id] as const,

    list: (params: {
      page: number;
      limit: number;
      search?: string;
      category?: string;
      status?: string;
    }) => ["articles", "list", params] as const,
  },

  contact: {
    all: ["contacts"] as const,
    list: (params: {
      page: number;
      limit: number;
      search: string;
      status: string;
    }) => ["contacts", "list", params] as const,
    detail: (id: string) => ["contacts", id] as const,
  },

  appointment: {
    all: ["appointments"] as const,

    myAppointment: ["my-appoinments"] as const,

    detail: (id: string) => ["appointments", id] as const,

    list: (params: {
      page: number;
      limit: number;
      search: string;
      category?: string;
      sort?: string;
      status: string;
    }) => ["appointments", "list", params] as const,
  },
  order: {
    all: ["orders"] as const,

    detail: (id: string) => ["orders", id] as const,

    list: (params: {
      page: number;
      limit: number;
      search: string;
      category?: string;
      sort?: string;
      status: string;
    }) => ["orders", "list", params] as const,
  },
  payment: {
    all: ["payments"] as const,

    detail: (id: string) => ["payments", id] as const,

    list: (params: {
      page?: number;
      limit?: number;
      status?: string;
      method?: string;
      orderId?: string;
    }) => ["payments", "list", params] as const,
  },
};
