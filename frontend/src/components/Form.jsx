import { useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import InputField from "./InputField";

const Form = ({ fields, onSubmit, buttonText, text, link, linkText }) => {
  const [userData, setUserData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form className="flex flex-col justify-center max-w-lg w-full bg-white shadow-md rounded px-8 py-8" onSubmit={handleSubmit} noValidate>
      <Logo className="h-24 text-blue-400" />
      {fields.map((field) => (
        <InputField
          key={field.id}
          id={field.id}
          type={field.type}
          label={field.label}
          name={field.name}
          value={userData[field.name]}
          handleChange={handleDataChange}
        />
      ))}
      <button
        className="mx-auto w-20 border rounded text-white bg-blue-500 p-2 mt-2 disabled:bg-blue-400 hover:bg-blue-600"
        type="submit"
        disabled={!isEmailValid(userData.email) || fields.some((field) => !userData[field.name]) || userData.password.length < 6}
      >
        {buttonText}
      </button>
      <p className="mx-auto p-2">
        {text} {linkText}
      </p>
    </form>
  );
};

export default Form;