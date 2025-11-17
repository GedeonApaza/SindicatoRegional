import { axiosJWT } from "./api";

export const getAlertas = async () => {
  const response = await axiosJWT.get("http://localhost:5000/alertas");
  return response.data;
};
