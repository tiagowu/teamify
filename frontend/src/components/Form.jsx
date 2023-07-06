import { useRef, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import InputField from "./InputField";

import { Link } from "react-router-dom";

const Form = ({ fields, onSubmit, buttonText, text, link, linkText }) => {
  const [userData, setUserData] = useState(Object.fromEntries(fields.map((field) => [field.name, ""])));
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

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
    <form className="flex flex-col justify-center max-w-lg w-full bg-white shadow-md rounded p-8 m-8" onSubmit={handleSubmit} noValidate>
      <Logo className="h-24 text-blue-400" />
      {fields.map((field, index) => (
        <InputField
          key={field.id}
          id={field.id}
          type={field.type}
          label={field.label}
          name={field.name}
          value={userData[field.name]}
          handleChange={handleDataChange}
          ref={index === 0 ? userRef : null}
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
        {text}{" "}
        <Link to={link} className="text-blue-600">
          {linkText}
        </Link>
      </p>
    </form>
  );
};

export default Form;
