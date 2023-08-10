import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export const deleteData = async (url, token) => {
  const response = await api.delete(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getData = async (url, token) => {
  const response = await api.get(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const patchData = async (url, post, token) => {
  const response = await api.patch(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postData = async (url, post, token) => {
  const response = await api.post(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const putData = async (url, post, token) => {
  const response = await api.put(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
