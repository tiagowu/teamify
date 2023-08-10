import { ReactComponent as Logo } from "../assets/Logo.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Logo className="w-36 text-blue-400 animate-bounce" />
    </div>
  );
};

export default Loading;
