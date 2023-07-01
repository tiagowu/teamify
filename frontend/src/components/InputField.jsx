const InputField = ({ id, type, label, name, value, handleChange }) => {
  return (
    <div className="flex flex-col my-2">
      <label className="text-blue-400 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
};

export default InputField;
