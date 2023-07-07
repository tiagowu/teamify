import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loading from "../pages/Loading";

const PersistLogin = () => {
  const { isLoading, setIsLoading } = useLoading();
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          if (isMounted.current) {
            setIsLoading(false);
          }
        }, 10);
      }
    };

    if (persist && !auth.accessToken && isMounted.current) {
      verifyRefreshToken();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }

    return () => {
      isMounted.current = false;
    };
  }, [persist, auth.accessToken, refresh, setIsLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
