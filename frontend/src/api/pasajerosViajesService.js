import { axiosJWT } from "./api";

export const getPasajerosViajes = async () => {
  const res = await axiosJWT.get("http://localhost:5000/pasajeros_viaje");
  return res.data;
};
