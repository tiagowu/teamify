import { MdAdd } from "react-icons/md";

import CreateProjectForm from "./CreateProjectForm";
import DataList from "./DataList";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ buttons, members, projects }) => {
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

  return <DataList buttons={buttons ? projectButtons : []} item={ProjectItem} list={projects} title="PROJECTS" />;
};

export default ProjectList;
