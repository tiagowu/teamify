import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/Logo.svg";

const Missing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-blue-400">
      <Logo className="w-48 mb-4" />
      <p className="text-3xl font-bold mb-4">Sorry, this page isn't available.</p>
      <Link to="/" className="text-xl font-bold hover:text-blue-300 underline">
        Go back to Teamify.
      </Link>
    </div>
  );
};

export default Missing;
