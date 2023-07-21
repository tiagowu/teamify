import { Link } from "react-router-dom";

const TeamItem = ({ item }) => {
  return (
    <div className="w-full bg-inherit px-2">
      <Link to={`/team/${item._id}`}>
        <div className="w-full bg-slate-300 rounded-lg p-3">
          <span className="whitespace-normal break-words text-lg">{item.name}</span>
          <span className="whitespace-normal break-words text-gray-600 text-sm"> {item.role}</span>
          <p className="text-sm whitespace-normal break-words">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default TeamItem;
