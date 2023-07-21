import { useNavigate, Link } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

import { logout } from "../api/auth";
import { ReactComponent as Logo } from "../assets/Logo.svg";

const NavBar = () => {
  const { setIsLoading } = useLoading();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setAuth({});
      navigate("/", { replace: true });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <nav className="absolute w-full min-w-[320px] flex items-center justify-between px-4 h-16 bg-gray-900 text-white">
      <Link to="/dashboard">
        <Logo className="h-full w-32 text-blue-400" />
      </Link>
      <ul className="flex items-center space-x-3">
        <li className="hidden sm:block">
          <div className="truncate max-w-[320px] bg-blue-400 rounded-full px-3 py-2">
            {auth.user && (
              <span className="text-md text-right">
                {auth.user.firstName} {auth.user.lastName}
              </span>
            )}
          </div>
        </li>
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
  );
};

export default NavBar;
