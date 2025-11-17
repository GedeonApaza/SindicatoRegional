import { axiosJWT } from "./api";

export const getPasajeros = async () => {
  const res = await axiosJWT.get("http://localhost:5000/pasajeros");
  return res.data;
};
