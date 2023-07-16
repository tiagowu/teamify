import { useEffect, useState } from "react";
import { getData } from "../api/axios";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

import TeamHeader from "./TeamHeader";
import TeamItem from "./TeamItem";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const { auth } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await getData("teams", auth.accessToken);
        setTeams(res.data.teams);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.user?.teams?.length > 0) fetchTeams();
  }, [auth.accessToken, auth.user.teams, setIsLoading]);

  return (
    <div className="rounded h-full bg-gray-200 overflow-y-auto overscroll-none scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-track-rounded ">
      <TeamHeader />
      {teams.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamList;
