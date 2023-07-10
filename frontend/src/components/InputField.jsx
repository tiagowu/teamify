import { forwardRef, useState } from "react";

const InputField = forwardRef((props, ref) => {
  const { id, type, label, maxLength, name, value, handleChange, handleKeyDown } = props;
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-blue-400 text-sm" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
          type={showPass ? "text" : type}
          id={id}
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          ref={ref}
          required
        />
        {type === "password" && (
          <button className="absolute right-2 top-2 text-gray-500 focus:outline-none" type="button" onClick={togglePasswordVisibility}>
            {showPass ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
});

export default InputField;
