import { useContext } from "react";
import LoadingContext from "../context/LoadingContext";

const useLoading = () => {
  return useContext(LoadingContext);
};

export default useLoading;
