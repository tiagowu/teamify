import { refresh } from "../api/auth";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await refresh();
    setAuth({
      accessToken: response.accessToken,
      user: response.user,
    });
    return response.accessToken;
  };
  return refreshToken;
};

export default useRefreshToken;
