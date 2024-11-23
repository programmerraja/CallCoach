import axios from "axios";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = !window.location.hostname.includes("localhost")
  ? `https://${window.location.hostname}/api`
  : "http://localhost:5000/api";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData) {
    const response = await axios.post(`${SERVER_URL}/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async login(data: LoginData) {
    const response = await axios.post(`${SERVER_URL}/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", jwtDecode<{ username: string,id: string }>(response.data.token).username);
    }
    return response.data;
  },

  decodeToken() {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
    return null;
  },
  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};


