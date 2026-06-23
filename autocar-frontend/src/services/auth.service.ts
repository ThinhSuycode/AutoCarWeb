import axios from "axios";
import { changeApi } from "./api";

const API_URL = `${import.meta.env.VITE_APP_API_KEYS}/auth`;

export const loginApi = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return res.data;
};

export const registerApi = async (data: {
  email: string;
  password: string;
  username: string;
  phone: string;
}) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

const getToken = () => localStorage.getItem("token");

export const getMeApi = async () => {
  const token = getToken();
  if (!token) return null;
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateAvatarApi = async (userId: string, file: File) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("avatar", file);

  console.log("userId gửi lên:", userId);
  console.log(
    "URL gọi:",
    `${import.meta.env.VITE_APP_API_KEYS}/users/${userId}/avatar`,
  );

  const res = await axios.patch(
    `${import.meta.env.VITE_APP_API_KEYS}/users/${userId}/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

export const changePasswordApi = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const token = getToken();

  const res = await axios.patch(`${API_URL}/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const loginWithGoogleApi = async (credential: string) => {
  const res = await axios.post(`${API_URL}/login-google`, { credential });
  return res.data;
};

export const forgotPasswordApi = async (email: string) => {
  return changeApi.request("auth/forgot-password", "add", { email });
};

export const resetPasswordApi = (token: string, password: string) => {
  return changeApi.request("/auth/reset-password", "add", {
    token,
    password,
  });
};
