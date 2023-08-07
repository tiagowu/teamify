import { useState } from "react";

import { updateTask } from "../api/team";
import useAuth from "../hooks/useAuth";
import useTeam from "../hooks/useTeam";
import LabeledText from "./LabeledText";

const TaskItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.isCompleted);
  const { auth } = useAuth();
  const { setTeam } = useTeam();
  const teamId = item.team;
  const taskId = item._id;

  const today = new Date();
  const date = item.deadline ? new Date(item.deadline) : null;
  const isOverdue = date < today;

  const handleCheckbox = async () => {
    try {
      const response = await updateTask({ isCompleted: !isChecked }, teamId, taskId, auth.accessToken);
      setIsChecked(response.task.isCompleted);
      setTeam((prevTeam) => ({
        ...prevTeam,
        tasks: response.tasks,
      }));
    } catch (err) {}
  };

  return (
    <div className={`min-w-[256px] bg-inherit py-2 ${isChecked ? "opacity-40" : ""}`}>
      <div className="relative h-full">
        <div className="absolute inset-0 w-full h-full bg-slate-300 rounded px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
          <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
            {date && (
              <p className={`font-bold ${isChecked ? "text-green-600" : "text-red-600"}`}>
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
          <LabeledText label="Assigned To">
            <p className="text-sm whitespace-normal break-words">
              {item.assignedTo.user.firstName} {item.assignedTo.user.lastName}
            </p>
          </LabeledText>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
