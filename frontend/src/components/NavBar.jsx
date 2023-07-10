import { useNavigate, Link } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";

import { postData } from "../api/axios";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

import { ReactComponent as Logo } from "../assets/Logo.svg";
import Loading from "../pages/Loading";

const NavBar = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await postData("logout");
      setAuth({});
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/", { replace: true });
      }, 200);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <nav className="absolute w-full min-w-[320px] flex items-center justify-between px-4 h-16 bg-gray-900 text-white">
          <Link to="/dashboard">
            <Logo className="h-full w-32 text-blue-400" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/dashboard" className="text-4xl">
                <MdDashboard />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center text-4xl">
                <MdLogout />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
