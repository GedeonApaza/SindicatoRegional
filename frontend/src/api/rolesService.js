import { axiosJWT } from "./api";

export const getRoles = async () => {
  const res = await axiosJWT.get("http://localhost:5000/roles");
  return res.data;
};
