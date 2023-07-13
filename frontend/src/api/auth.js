import { postData } from "./axios";

export const login = async (data) => {
  try {
    const response = await postData("login", data);
    const accessToken = response?.data?.accessToken;
    const user = response?.data?.user;
    return { accessToken, user };
  } catch (err) {
    throw err;
  }
};

export const signup = async (data) => {
  try {
    const response = await postData("signup", data);
    const accessToken = response?.data?.accessToken;
    const user = response?.data?.user;
    return { accessToken, user };
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await postData("logout");
    return response;
  } catch (err) {
    throw err;
  }
};

export const refresh = async () => {
  try {
    const response = await postData("refresh-token", {
      withCredentials: true,
    });
    const accessToken = response?.data?.accessToken;
    const user = response?.data?.user;
    return { accessToken, user };
  } catch (err) {
    throw err;
  }
};
