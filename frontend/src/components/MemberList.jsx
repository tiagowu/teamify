import { MdPersonAddAlt1 } from "react-icons/md";

import DataList from "./DataList";
// import AcceptRequestForm from "./AcceptRequestForm";
import MemberItem from "./MemberItem";

const MemberList = ({ buttons, members, requests }) => {
  const memberButtons = [
    {
      key: "accept-request",
      icon: <MdPersonAddAlt1 />,
      modal: {
        title: "Accept Request",
        // component: <AcceptRequestForm />,
      },
    },
  ];

  return <DataList buttons={buttons ? memberButtons : []} item={MemberItem} list={members} title="MEMBERS" vertical />;
};

export default MemberList;
