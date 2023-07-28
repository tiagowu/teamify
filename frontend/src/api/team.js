import { getData, postData } from "./axios";

export const getTeamById = async (teamId, token) => {
  try {
    const response = await getData(`teams/${teamId}`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteTeam = async (teamId, token) => {
  try {
    const response = await deleteData(`teams/${teamId}`, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const leaveTeam = async (teamId, token) => {
  try {
    const response = await deleteData(`teams/${teamId}/leave`, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createProject = async (data, teamId, token) => {
  try {
    console.log(teamId);
    const response = await postData(`teams/${teamId}/projects`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};
