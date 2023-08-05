import { useParams } from "react-router-dom";
import { MdArrowDownward, MdArrowUpward, MdPersonRemove } from "react-icons/md";

import { removeMember, updateMember } from "../api/team";
import useAuth from "../hooks/useAuth";
import useTeam from "../hooks/useTeam";

const MemberItem = ({ item, role }) => {
  const { auth } = useAuth();
  const { teamId } = useParams();
  const { setTeam } = useTeam();

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await removeMember(teamId, memberId, auth.accessToken);
      setTeam((prevTeam) => ({
        ...prevTeam,
        members: response.members,
      }));
    } catch (err) {}
  };

  const handleUpdateMember = async (memberId, data) => {
    try {
      const response = await updateMember(data, teamId, memberId, auth.accessToken);
      setTeam((prevTeam) => ({
        ...prevTeam,
        members: response.members,
      }));
    } catch (err) {}
  };

  return (
    <div className="w-full bg-inherit px-2">
      <div className="flex flex-row justify-between w-full bg-slate-300 rounded-lg p-2">
        <div className="flex flex-col whitespace-nowrap overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
          <p className="text-lg">{item.name}</p>
          <p className="text-gray-600 text-sm"> {item.role}</p>
        </div>
        <div className="flex flex-row gap-2 text-2xl">
          {role === "Manager" && (
            <>
              {item.role === "Member" && (
                <button onClick={() => handleUpdateMember(item._id, { role: "Co-Manager" })}>
                  <MdArrowUpward />
                </button>
              )}
              {item.role === "Co-Manager" && (
                <button onClick={() => handleUpdateMember(item._id, { role: "Member" })}>
                  <MdArrowDownward />
                </button>
              )}
              {item.role !== "Manager" && (
                <button onClick={() => handleRemoveMember(item._id)}>
                  <MdPersonRemove />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
