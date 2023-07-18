import { useState } from "react";

import Modal from "./Modal";

const DataHeader = ({ buttons, title, vertical }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modal) => () => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className={`flex justify-center sticky top-0 z-30 bg-blue-400 p-2 rounded ${!vertical && "flex-col left-0"}`}>
        <p className={`flex justify-center items-center flex-1 ${!vertical && "transform -rotate-90 w-8"}`}>{title}</p>
        <div className="flex justify-center gap-2">
          {buttons.map((button) => (
            <button key={button.key} onClick={openModal(button.modal)} className="flex items-center text-2xl">
              {button.icon}
            </button>
          ))}
        </div>
      </div>
      <div className="relative z-40">
        {activeModal && (
          <Modal closeModal={closeModal}>
            <p className="text-xl text-center">{activeModal.title}</p>
            {activeModal.component}
          </Modal>
        )}
      </div>
    </>
  );
};

export default DataHeader;
