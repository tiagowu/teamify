import axios from "axios";

export const deleteData = async (url, token) => {
  const response = await axios.delete(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getData = async (url, token) => {
  const response = await axios.get(`/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const patchData = async (url, post, token) => {
  const response = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postData = async (url, post, token) => {
  const response = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const putData = async (url, post, token) => {
  const response = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
