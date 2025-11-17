import { axiosJWT } from "./api";

export const getConductores = async () => {
  const res = await axiosJWT.get("http://localhost:5000/conductores");
  return res.data;
};
