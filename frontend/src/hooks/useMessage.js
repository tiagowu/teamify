import { useContext } from "react";
import MessageContext from "../context/MessageContext";

const useMessage = () => {
  return useContext(MessageContext);
};

export default useMessage;
