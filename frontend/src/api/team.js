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

export const acceptRequest = async (teamId, userId, token) => {
  try {
    const response = await postData(`teams/${teamId}/${userId}/accept`, {}, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const declineRequest = async (teamId, userId, token) => {
  try {
    const response = await postData(`teams/${teamId}/${userId}/decline`, {}, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateMember = async (data, teamId, memberId, token) => {
  try {
    const response = await putData(`teams/${teamId}/members/${memberId}`, data, token);
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

export const updateProject = async (data, teamId, projectId, token) => {
  try {
    const response = await putData(`teams/${teamId}/projects/${projectId}`, data, token);
    return response.data;
  } catch (err) {
    throw err;
  }
};
