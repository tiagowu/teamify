const ListSelect = ({ handleChange, label, list, name, selected }) => {
  return (
    <>
      <label className="text-blue-400 text-sm">{label}</label>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded h-40 shadow border rounded w-full p-1">
        {list.map((item) => (
          <div className="flex items-center m-2 p-2 rounded bg-gray-200" key={item._id}>
            <input
              className="flex-shrink-0 appearance-none bg-white rounded h-5 w-5 m-2 checked:bg-blue-400"
              type="checkbox"
              id={`item-${item._id}`}
              name={name}
              value={item._id}
              checked={selected.includes(item._id.toString())}
              onChange={handleChange}
            />
            <label
              className="flex-grow text-md whitespace-nowrap overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded"
              htmlFor={`item-${item._id}`}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListSelect;
