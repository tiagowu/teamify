import { MdAdd } from "react-icons/md";

import CreateTaskForm from "./CreateTaskForm";
import DataList from "./DataList";
import TaskItem from "./TaskItem";

const TaskList = ({ members, tasks, role }) => {
  let orderedTasks = [];

  if (tasks && tasks.length > 0) {
    const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);
    const completedTasks = sortedTasks.filter((task) => task.isCompleted);
    orderedTasks = [...incompleteTasks, ...completedTasks];
  }

  const projectButtons = [
    {
      key: "create-task",
      icon: <MdAdd />,
      modal: {
        title: "Create New Task",
        component: <CreateTaskForm members={members} />,
      },
    },
  ];

  return <DataList buttons={["Manager", "Co-Manager"].includes(role) ? projectButtons : []} item={TaskItem} list={orderedTasks} title="TASKS" />;
};

export default TaskList;
