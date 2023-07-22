import { useState } from "react";
import LabeledText from "./LabeledText";

const ProjectItem = ({ item }) => {
  const [completed, setCompleted] = useState(false);
  const date = item.deadline ? new Date(item.deadline) : null;

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  return (
    <div className="min-w-[256px] bg-inherit py-2">
      <div className="relative h-full">
        <div className="absolute inset-0 w-full h-full bg-slate-300 rounded p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
          <div className="absolute top-2 right-2 flex items-center gap-2">
            {date && <p className="text-red-600 font-bold">{date.toLocaleDateString()}</p>}
            <input
              className="appearance-none bg-white rounded h-5 w-5 checked:bg-blue-400"
              type="checkbox"
              id={`checkbox-${item._id}`}
              checked={completed}
              onChange={handleCheckboxChange}
            />
          </div>
          <LabeledText label="Name">
            <p className="whitespace-normal break-words text-lg px-">{item.name}</p>
          </LabeledText>
          <LabeledText label="Description">
            <p className="text-sm whitespace-normal break-words">{item.description}</p>
          </LabeledText>
          {item.members.length > 0 && (
            <LabeledText label="Members">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
                {item.members.map((member, index) => (
                  <p className="inline" key={index}>
                    {member.user.firstName} {member.user.lastName}
                    {index < item.members.length - 1 ? (index === item.members.length - 2 ? ", and " : ", ") : ""}
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
