import { MdGroupAdd, MdAdd } from "react-icons/md";

import CreateTeamForm from "./CreateTeamForm";
import DataList from "./DataList";
import JoinTeamForm from "./JoinTeamForm";
import TeamItem from "./TeamItem";

const TeamList = ({ teams }) => {
  const teamButtons = [
    {
      key: "join-team",
      icon: <MdGroupAdd />,
      modal: {
        title: "Join Team",
        component: <JoinTeamForm />,
      },
    },
    {
      key: "create-team",
      icon: <MdAdd />,
      modal: {
        title: "Create New Team",
        component: <CreateTeamForm />,
      },
    },
  ];

  return <DataList buttons={teamButtons} item={TeamItem} list={teams} title="TEAMS" vertical />;
};

export default TeamList;
