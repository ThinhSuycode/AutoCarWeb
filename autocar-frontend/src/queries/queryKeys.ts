export const queryKeys = {
  car: {
    all: ["cars"] as const,
    list: (params: { page: number; limit: number; search?: string }) =>
      ["cars", "list", params] as const,
    detail: (id: string) => ["cars", id] as const,
  },

  user: {
    all: ["users"] as const,
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
    list: (params?: Record<string, string>) => ["contacts", params] as const,
    detail: (id: string) => ["contacts", id] as const,
  },
};
