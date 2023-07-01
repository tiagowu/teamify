import Form from "./Form";

const LoginForm = () => {
  const handleSubmit = (userData) => {
    console.log("Login:", userData);
  };

  const loginFields = [
    { id: "login-email", type: "email", label: "Email", name: "email" },
    { id: "login-password", type: "password", label: "Password", name: "password" },
  ];

  return <Form fields={loginFields} onSubmit={handleSubmit} buttonText="Login" text="Don't have an account?" link="/signup" linkText="Sign Up" />;
};

export default LoginForm;
