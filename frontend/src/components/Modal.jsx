import { useRef } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ children, closeModal }) => {
  const modalRef = useRef();

  const handleClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center" onClick={handleClose}>
      <div
        ref={modalRef}
        className="overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded max-h-[90%] bg-white w-3/4 lg:w-1/2 rounded z-50"
      >
        <div className="flex flex-col items-center p-4 relative">
          <button className="absolute top-0 right-0 p-4 text-xl" onClick={closeModal}>
            <MdClose />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
