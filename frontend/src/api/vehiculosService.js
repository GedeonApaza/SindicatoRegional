import { axiosJWT } from "./api";

export const getVehiculos = async () => {
  const res = await axiosJWT.get("http://localhost:5000/vehiculos");
  return res.data;
};
