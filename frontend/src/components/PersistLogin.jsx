import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { refresh } from "../api/auth";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, persist } = useAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        setAuth(response);
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
  }, [persist, auth.accessToken, setAuth, setIsLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
