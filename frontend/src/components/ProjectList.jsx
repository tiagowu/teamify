import { MdAdd } from "react-icons/md";

import CreateProjectForm from "./CreateProjectForm";
import DataList from "./DataList";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ buttons, members, projects }) => {
  const sortedProjects = projects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const incompleteProjects = sortedProjects.filter((project) => !project.isCompleted);
  const completedProjects = sortedProjects.filter((project) => project.isCompleted);
  const orderedProjects = [...incompleteProjects, ...completedProjects];

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

  return <DataList buttons={buttons ? projectButtons : []} item={ProjectItem} list={orderedProjects} title="PROJECTS" />;
};

export default ProjectList;
