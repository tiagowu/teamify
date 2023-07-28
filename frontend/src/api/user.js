import { postData } from "./axios";

export const createTeam = async (data, token) => {
  try {
    const response = await postData("teams", data, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const joinTeam = async (data, token) => {
  try {
    const response = await postData("teams/join", data, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};
