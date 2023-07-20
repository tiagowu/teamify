import { useRef, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import InputField from "./InputField";
import useMessage from "../hooks/useMessage";

import { Link } from "react-router-dom";

const Form = ({ buttonText, data, disabled, fields, handleChange, handleSubmit, link, linkText, renderAdditionalFields, text }) => {
  const { message } = useMessage();
  const userRef = useRef();

  const getMessageColor = () => {
    return message && message.type === "success" ? "text-green-500" : "text-red-500";
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <form className="overflow-auto flex flex-col justify-center max-w-lg w-full bg-white shadow-md rounded p-4" onSubmit={handleSubmit} noValidate>
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
      {renderAdditionalFields && renderAdditionalFields()}
      {message && <p className={`text-center normal-whitespace break-words py-2 ${getMessageColor()}`}>{message.content}</p>}
      <button
        className="mx-auto w-20 border rounded text-white bg-blue-500 p-2 mt-2 disabled:bg-blue-400 hover:bg-blue-600"
        type="submit"
        disabled={fields.some((field) => !data[field.name]) || disabled}
      >
        {buttonText}
      </button>
      <p className="text-center p-2">
        {text}{" "}
        <Link to={link} className="text-blue-600">
          {linkText}
        </Link>
      </p>
    </form>
  );
};

export default Form;
