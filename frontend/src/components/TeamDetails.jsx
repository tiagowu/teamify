import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteTeam, leaveTeam } from "../api/team";
import useAuth from "../hooks/useAuth";
import Modal from "./Modal";

const TeamDetails = ({ name, description, role }) => {
  const [activeModal, setActiveModal] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { teamId } = useParams();

  const openModal = (modal) => () => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleDeleteTeam = async () => {
    try {
      await deleteTeam(teamId, auth.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {}
  };

  const handleLeaveTeam = async () => {
    try {
      await leaveTeam(teamId, auth.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {}
  };

  const actionButtons = [
    {
      roles: ["Manager"],
      key: "delete-team",
      text: "Delete Team",
      modal: {
        title: "Are you sure you want to delete this team?",
        action: handleDeleteTeam,
      },
    },
    {
      roles: ["Co-Manager", "Member"],
      key: "leave-team",
      text: "Leave Team",
      modal: {
        title: "Are you sure you want to leave this team?",
        action: handleLeaveTeam,
      },
    },
  ];

  return (
    <>
      <div className="absolute inset-0 overflow-auto p-2 mb-11 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
        <p className="text-center text-2xl sm:text-base md:text-xl text-blue-400 font-bold break-words">{name}</p>
        <p className="text-center text-base sm:text-sm md:text-base text-blue-300 break-words">{description}</p>
      </div>
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        {actionButtons.map(
          (button) =>
            button.roles.includes(role) && (
              <button key={button.key} className="bg-red-500 text-sm text-white px-4 py-2 rounded hover:bg-red-600" onClick={openModal(button.modal)}>
                {button.text}
              </button>
            )
        )}
      </div>
      {activeModal && (
        <Modal closeModal={closeModal}>
          <p>{activeModal.title}</p>
          <div className="flex justify-center gap-2 pt-4">
            <button className="bg-red-500 text-sm text-white px-4 py-2 rounded hover:bg-red-600" onClick={activeModal.action}>
              Confirm
            </button>
            <button className="bg-gray-400 text-sm text-white px-4 py-2 rounded hover:bg-gray-500" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TeamDetails;
