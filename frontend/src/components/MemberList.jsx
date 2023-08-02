import { MdPersonAddAlt1 } from "react-icons/md";

import PendingRequestForm from "./PendingRequestForm";
import DataList from "./DataList";
import MemberItem from "./MemberItem";

const MemberList = ({ members, role }) => {
  const memberButtons = [
    {
      key: "accept-request",
      icon: <MdPersonAddAlt1 />,
      modal: {
        title: "Accept Requests",
        component: <PendingRequestForm />,
      },
    },
  ];

  return (
    <DataList
      buttons={["Manager", "Co-Manager"].includes(role) ? memberButtons : []}
      item={MemberItem}
      list={members}
      title="MEMBERS"
      role={role}
      vertical
    />
  );
};

export default MemberList;
