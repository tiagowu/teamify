import { deleteData, getData, postData, putData } from "./axios";

export const getTeams = async (token) => {
  try {
    const response = await getData(`teams`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

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
    return response;
  } catch (err) {
    throw err;
  }
};

export const leaveTeam = async (teamId, token) => {
  try {
    const response = await deleteData(`teams/${teamId}/leave`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPendingRequest = async (teamId, token) => {
  try {
    const response = await getData(`teams/${teamId}/pending-requests`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const acceptRequest = async (teamId, userId, token) => {
  try {
    const response = await postData(`teams/${teamId}/${userId}/accept`, {}, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const declineRequest = async (teamId, userId, token) => {
  try {
    const response = await postData(`teams/${teamId}/${userId}/decline`, {}, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateMember = async (data, teamId, memberId, token) => {
  try {
    const response = await putData(`teams/${teamId}/members/${memberId}`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const removeMember = async (teamId, memberId, token) => {
  try {
    const response = await deleteData(`teams/${teamId}/members/${memberId}`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getProjects = async (token) => {
  try {
    const response = await getData(`projects`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createProject = async (data, teamId, token) => {
  try {
    const response = await postData(`teams/${teamId}/projects`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateProject = async (data, teamId, projectId, token) => {
  try {
    const response = await putData(`teams/${teamId}/projects/${projectId}`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getTasks = async (token) => {
  try {
    const response = await getData(`tasks`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createTask = async (data, teamId, token) => {
  try {
    const response = await postData(`teams/${teamId}/tasks`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateTask = async (data, teamId, taskId, token) => {
  try {
    const response = await putData(`teams/${teamId}/tasks/${taskId}`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAnnouncements = async (token) => {
  try {
    const response = await getData(`announcements`, token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const makeAnnouncement = async (data, teamId, token) => {
  try {
    const response = await postData(`teams/${teamId}/announcements`, data, token);
    return response;
  } catch (err) {
    throw err;
  }
};
