import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { postData } from "../api/axios";
import Form from "./Form";

const SignUpForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      const res = await postData("signup", userData);
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      setAuth({ user, accessToken });
    } catch (err) {
      console.log(err);
    }
    navigate("/dashboard", { replace: true });
  };

  const signupFields = [
    { id: "signup-name", type: "text", label: "Full Name", name: "fullName" },
    { id: "signup-email", type: "email", label: "Email", name: "email" },
    { id: "signup-password", type: "password", label: "Password", name: "password" },
  ];

  return <Form fields={signupFields} onSubmit={handleSubmit} buttonText="Sign Up" text="Already have an account?" link="/" linkText="Login" />;
};

export default SignUpForm;
