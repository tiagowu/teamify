import { useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import InputField from "./InputField";

const LoginForm = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { email, password } = userData;

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form className="flex flex-col justify-center max-w-lg w-full bg-white shadow-md rounded px-8 py-8" onSubmit={handleSubmit} noValidate>
      <Logo className="h-24 text-blue-400" />
      <InputField id="login-email" type="email" label="Email" name="email" value={email} handleChange={handleDataChange} />
      <InputField id="login-password" type="password" label="Password" name="password" value={password} handleChange={handleDataChange} />
      <button
        className="mx-auto w-20 border rounded text-white bg-blue-500 p-2 mt-2 disabled:bg-blue-400 hover:bg-blue-600"
        type="submit"
        disabled={!isEmailValid(email) || !password || password.length < 6}
      >
        Login
      </button>
      <p className="mx-auto p-2">Don't have an account? Sign up</p>
    </form>
  );
};

export default LoginForm;
