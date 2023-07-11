const TeamItem = ({ team }) => {
  return (
    <div className="w-full bg-inherit px-2 py-1">
      <div className="w-full bg-slate-300 rounded-lg p-3">
        <span className="whitespace-normal break-words text-lg">{team.name}</span>
        <span className="whitespace-normal break-words text-gray-600 text-sm"> {team.role}</span>
        <p className="text-sm whitespace-normal break-words">{team.description}</p>
      </div>
    </div>
  );
};

export default TeamItem;
