import { axiosJWT } from "./api";

export const getUsuarios = async () => {
  const res = await axiosJWT.get("http://localhost:5000/users");
  return res.data;
};
