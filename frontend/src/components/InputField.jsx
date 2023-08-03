import { forwardRef, useState } from "react";

const InputField = forwardRef((props, ref) => {
  const { id, type, label, maxLength, min, name, rows, value, handleChange, handleKeyDown } = props;
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-blue-400 text-sm" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex justify-center">
        {type === "textarea" ? (
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400 resize-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded"
            id={id}
            maxLength={maxLength}
            name={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={ref}
            spellCheck={false}
            value={value}
            required
            rows={rows}
          />
        ) : (
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
            autoComplete="off"
            id={id}
            maxLength={maxLength}
            min={min}
            name={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={ref}
            spellCheck={false}
            type={showPass ? "text" : type}
            value={value}
            required
          />
        )}
        {type === "password" && value && (
          <button className="absolute right-2 top-2 text-gray-500 focus:outline-none" type="button" onClick={togglePasswordVisibility}>
            {showPass ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
});

export default InputField;
