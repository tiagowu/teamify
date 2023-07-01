import Form from "./Form";

const SignUpForm = () => {
  const handleSubmit = (userData) => {
    console.log("SignUp:", userData);
  };

  const signupFields = [
    { id: "signup-name", type: "text", label: "Full Name", name: "fullName" },
    { id: "signup-email", type: "email", label: "Email", name: "email" },
    { id: "signup-password", type: "password", label: "Password", name: "password" },
  ];

  return <Form fields={signupFields} onSubmit={handleSubmit} buttonText="Sign Up" text="Already have an account?" link="/login" linkText="Login" />;
};

export default SignUpForm;
