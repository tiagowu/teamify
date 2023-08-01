import { useState } from "react";
import LabeledText from "./LabeledText";
import { updateProject } from "../api/team";
import useAuth from "../hooks/useAuth";
import useTeam from "../hooks/useTeam";

const ProjectItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.isCompleted);
  const { auth } = useAuth();
  const { setTeam } = useTeam();
  const teamId = item.team;
  const projectId = item._id;

  const numMembers = item.members.length;
  const sortedMembers = item.members.map((member) => `${member.user.firstName} ${member.user.lastName}`).sort((a, b) => a.localeCompare(b));

  const today = new Date();
  const date = item.deadline ? new Date(item.deadline) : null;
  const isOverdue = date < today;

  const handleCheckbox = async () => {
    try {
      const response = await updateProject({ isCompleted: !isChecked }, teamId, projectId, auth.accessToken);
      setIsChecked(response.project.isCompleted);
      setTeam((prevTeam) => ({
        ...prevTeam,
        projects: response.projects,
      }));
    } catch (err) {}
  };

  return (
    <div className={`min-w-[256px] bg-inherit py-2 ${isChecked ? "opacity-40" : ""}`}>
      <div className="relative h-full">
        <div className="absolute inset-0 w-full h-full bg-slate-300 rounded px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
          <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
            {date && (
              <p className={`font-bold ${isChecked ? (isOverdue ? "text-red-600" : "text-green-600") : "text-red-600"}`}>
                {date.toLocaleDateString(undefined, { timeZone: "UTC" })}
              </p>
            )}
            <input
              className="appearance-none bg-white rounded h-5 w-5 checked:bg-blue-400"
              type="checkbox"
              id={`checkbox-${item._id}`}
              checked={isChecked}
              onChange={handleCheckbox}
              disabled={isOverdue && isChecked}
            />
          </div>
          <LabeledText label="Name">
            <p className="whitespace-normal break-words text-lg">{item.name}</p>
          </LabeledText>
          <LabeledText label="Description">
            <p className="text-sm whitespace-normal break-words">{item.description}</p>
          </LabeledText>
          {numMembers > 0 && (
            <LabeledText label="Members">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
                {sortedMembers.map((member, index) => (
                  <p className="inline" key={index}>
                    {member}
                    {index < numMembers - 1 ? (index === numMembers - 2 ? (numMembers === 2 ? " and " : ", and ") : ", ") : ""}
                  </p>
                ))}
              </div>
            </LabeledText>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
