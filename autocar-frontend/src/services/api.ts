import axios from "axios";

const API_KEYS = import.meta.env.VITE_APP_API_KEYS;
console.log("API URL:", API_KEYS);
// Tạo axios instance riêng
const axiosInstance = axios.create({
  baseURL: API_KEYS,
});

// Interceptor — tự động gắn token vào mọi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor — tự động xử lý token hết hạn
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/dang-nhap";
    }
    return Promise.reject(error);
  },
);

export const callApi = {
  getData: async <T = unknown>(endpoint: string): Promise<T> => {
    try {
      const res = await axiosInstance<T>(endpoint);
      return res.data;
    } catch (error) {
      console.error(`API GET Error (${endpoint}):`, error);
      throw error;
    }
  },
};

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";
type ChangeMessage = "add" | "update" | "patch" | "delete";

const METHOD_MAP: Record<ChangeMessage, HttpMethod> = {
  add: "POST",
  update: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const changeApi = {
  request: async <T = unknown, B = unknown>(
    endpoint: string,
    message: ChangeMessage,
    body?: B,
    id?: string,
  ): Promise<T> => {
    const method = METHOD_MAP[message];

    const url = id ? `${endpoint}/${id}` : endpoint;

    try {
      const res = await axiosInstance<T>({ url, method, data: body });
      return res.data;
    } catch (error) {
      console.error(`API ${method} failed (${endpoint}):`, error);
      throw error;
    }
  },
};
