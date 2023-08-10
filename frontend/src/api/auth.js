import { postData } from "./axios";

export const login = async (data) => {
  try {
    const response = await postData("login", data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const signup = async (data) => {
  try {
    const response = await postData("signup", data);
    return response;
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
    const response = await postData("refresh-token");
    return response;
  } catch (err) {
    throw err;
  }
};
