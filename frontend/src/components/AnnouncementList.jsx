import { MdAdd } from "react-icons/md";

import DataList from "./DataList";
import AnnouncementItem from "./AnnouncementItem";
import MakeAnnouncementForm from "./MakeAnnouncementForm";

const AnnouncementList = ({ announcements, role }) => {
  const sortedAnnouncements = announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const announcementButtons = [
    {
      key: "make-annoucement",
      icon: <MdAdd />,
      modal: {
        title: "Make Announcement",
        component: <MakeAnnouncementForm />,
      },
    },
  ];

  return (
    <DataList
      buttons={["Manager", "Co-Manager"].includes(role) ? announcementButtons : []}
      item={AnnouncementItem}
      list={sortedAnnouncements}
      title="ANNOUCEMENTS"
      vertical
    />
  );
};

export default AnnouncementList;
