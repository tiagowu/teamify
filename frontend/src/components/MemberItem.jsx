const MemberItem = ({ item }) => {
  return (
    <div className="w-full bg-inherit px-2">
      <div className="w-full bg-slate-300 rounded-lg p-2">
        <p className="text-lg truncate">{item.fullName}</p>
        <p className="text-gray-600 text-sm"> {item.role}</p>
      </div>
    </div>
  );
};

export default MemberItem;
