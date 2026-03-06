const API_KEYS = import.meta.env.VITE_APP_API_KEYS;

export const callApi = {
  getData: async (endpoint: string) => {
    try {
      const res = await fetch(`${API_KEYS}/${endpoint}`);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`,
        );
      }

      return await res.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  },
};

//Thay đổi dữ liệu api
type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type ChangeMessage = "add" | "update" | "patch" | "delete";

const METHOD_MAP: Record<ChangeMessage, HttpMethod> = {
  add: "POST",
  update: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const changeApi = {
  getData: async <T = unknown>(
    endPoint: string,
    message: ChangeMessage,
    dataNew?: T,
  ): Promise<Response | null> => {
    const method = METHOD_MAP[message];

    if (!method) {
      console.warn(`Unknown message type: "${message}"`);
      return null;
    }

    try {
      const response = await fetch(`${API_KEYS}/${endPoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: dataNew !== undefined ? JSON.stringify(dataNew) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error(`API ${message} failed for "${endPoint}":`, error);
      return null;
    }
  },
};
