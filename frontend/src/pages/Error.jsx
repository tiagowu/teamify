import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/Logo.svg";

const Error = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-blue-400">
      <Logo className="w-48 mb-4" />
      <p className="text-3xl text-center font-bold mb-4">{message}</p>
      <div className="flex gap-4 text-xl font-bold underline">
        <button className="hover:text-blue-300" onClick={() => navigate(-1)}>
          Go back.
        </button>
        <Link to="/" className="hover:text-blue-300">
          Go back to Teamify.
        </Link>
      </div>
    </div>
  );
};

export default Error;
