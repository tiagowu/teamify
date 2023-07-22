import { MdArrowDownward, MdArrowUpward, MdOutlinePersonRemove } from "react-icons/md";

const MemberItem = ({ item }) => {
  return (
    <div className="w-full bg-inherit px-2">
      <div className="flex flex-row justify-between w-full bg-slate-300 rounded-lg p-2">
        <div className="flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
          <p className="text-lg">{item.name}</p>
          <p className="text-gray-600 text-sm"> {item.role}</p>
        </div>
        <div className="flex flex-row gap-2 text-2xl">
          {item.role === "Member" && (
            <button className="">
              <MdArrowUpward />
            </button>
          )}
          {item.role === "Co-Manager" && (
            <button className="">
              <MdArrowDownward />
            </button>
          )}
          {item.role !== "Manager" && (
            <button className="">
              <MdOutlinePersonRemove />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
