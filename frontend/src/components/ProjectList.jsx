import { MdAdd } from "react-icons/md";

import CreateProjectForm from "./CreateProjectForm";
import DataList from "./DataList";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ members, projects, role }) => {
  let orderedProjects = [];

  if (projects && projects.length > 0) {
    const sortedProjects = projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const incompleteProjects = sortedProjects.filter((project) => !project.isCompleted);
    const completedProjects = sortedProjects.filter((project) => project.isCompleted).sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    orderedProjects = [...incompleteProjects, ...completedProjects];
  }

  const projectButtons = [
    {
      key: "create-project",
      icon: <MdAdd />,
      modal: {
        title: "Create New Project",
        component: <CreateProjectForm members={members} />,
      },
    },
  ];

  return (
    <DataList buttons={["Manager", "Co-Manager"].includes(role) ? projectButtons : []} item={ProjectItem} list={orderedProjects} title="PROJECTS" />
  );
};

export default ProjectList;
