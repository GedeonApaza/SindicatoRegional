import axios from "axios";
import { jwtDecode } from "jwt-decode";

let token = "";
let expire = "";

export const setAuthToken = (newToken) => {
  token = newToken;
  expire = jwtDecode(newToken).exp;
};

export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async (config) => {
  const now = Date.now();

  if (expire * 1000 < now) {
    const res = await axios.get("http://localhost:5000/token");
    const newToken = res.data.accessToken;
    setAuthToken(newToken);

    config.headers.Authorization = `Bearer ${newToken}`;
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
