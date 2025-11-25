import axios from "axios";
import { API_URL } from "./api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || API_URL,
  withCredentials: true,
});

export default api;
