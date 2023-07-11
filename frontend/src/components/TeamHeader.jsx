import { useState } from "react";
import { MdGroupAdd, MdAdd } from "react-icons/md";

import Modal from "./Modal";
import JoinTeamForm from "./JoinTeamForm";
import CreateTeamForm from "./CreateTeamForm";

const TeamHeader = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modal) => () => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex justify-center sticky top-0 p-2 bg-blue-400 rounded">
      <p className="flex justify-center items-center flex-1">TEAMS</p>
      <div className="flex justify-center gap-2">
        <button onClick={openModal("joinTeam")} className="flex items-center text-2xl">
          <MdGroupAdd />
        </button>
        <button onClick={openModal("createTeam")} className="flex items-center text-2xl">
          <MdAdd />
        </button>
        {activeModal === "joinTeam" && (
          <Modal closeModal={closeModal}>
            <p className="text-xl text-center">Join Team</p>
            <JoinTeamForm closeModal={closeModal} />
          </Modal>
        )}
        {activeModal === "createTeam" && (
          <Modal closeModal={closeModal}>
            <p className="text-xl text-center">Create New Team</p>
            <CreateTeamForm closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TeamHeader;
