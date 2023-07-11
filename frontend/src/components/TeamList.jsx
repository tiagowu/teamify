import React, { useEffect, useState } from "react";

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

    fetchTeams();
  }, [auth.accessToken, setIsLoading]);

  return (
    <>
      <TeamHeader />
      {teams.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </>
  );
};

export default TeamList;
