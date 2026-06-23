export const queryKeys = {
  car: {
    all: ["cars"] as const,
    detail: (id: string) => ["cars", id] as const,
  },

  user: {
    all: ["users"] as const,
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
    }) => ["articles", params] as const,
  },

  contact: {
    all: ["contacts"] as const,
    list: (params?: Record<string, string>) => ["contacts", params] as const,
    detail: (id: string) => ["contacts", id] as const,
  },
};
