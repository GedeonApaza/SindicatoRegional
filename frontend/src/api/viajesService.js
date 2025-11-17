import { axiosJWT } from "./api";

export const getViajes = async () => {
  const res = await axiosJWT.get("http://localhost:5000/viajes");
  return res.data;
};
