import axios from "axios";

export const getData = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postData = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putData = async (url, post, token) => {
  const res = await axios.put(`/url/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
