import { useContext } from "react";
import TeamContext from "../context/TeamContext";

const useTeam = () => {
  return useContext(TeamContext);
};

export default useTeam;
