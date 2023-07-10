import { useRef, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import InputField from "./InputField";

import { Link } from "react-router-dom";

const Form = ({ buttonText, data, disabled, fields, handleChange, handleSubmit, link, linkText, text }) => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <form className="flex flex-col justify-center max-w-lg w-full bg-white shadow-md rounded p-4" onSubmit={handleSubmit} noValidate>
      <Logo className="h-24 text-blue-400" />
      {fields.map((field, index) => (
        <InputField
          key={field.id}
          id={field.id}
          type={field.type}
          label={field.label}
          name={field.name}
          value={data[field.name]}
          handleChange={handleChange}
          handleKeyDown={field.onKeyDown ? field.onKeyDown : null}
          maxLength={field.maxLength ? field.maxLength : null}
          ref={index === 0 ? userRef : null}
        />
      ))}
      <button
        className="mx-auto w-20 border rounded text-white bg-blue-500 p-2 mt-2 disabled:bg-blue-400 hover:bg-blue-600"
        type="submit"
        disabled={fields.some((field) => !data[field.name]) || disabled}
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
