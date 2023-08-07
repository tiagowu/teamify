import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTeamById } from "../api/team";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import useTeam from "../hooks/useTeam";

import Error from "./Error";
import Loading from "./Loading";
import ProjectList from "../components/ProjectList";
import MemberList from "../components/MemberList";
import TaskList from "../components/TaskList";
import TeamDetails from "../components/TeamDetails";
import AnnouncementList from "../components/AnnouncementList";

const Team = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(null);
  const { auth } = useAuth();
  const { message, setMessage } = useMessage();
  const { teamId } = useParams();
  const { team, setTeam } = useTeam();

  useEffect(() => {
    const getTeam = async () => {
      try {
        const response = await getTeamById(teamId, auth.accessToken);
        setTeam(response.team);
        setIsDataLoaded(true);
      } catch (err) {
        setMessage({ type: "error", content: err.response.data.error });
      }
    };

    getTeam();
  }, [auth.accessToken, setMessage, setTeam, teamId]);

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

  if (!isDataLoaded && message.type === "error" && message.content) {
    return <Error message={message.content} />;
  }

  if (!isDataLoaded) {
    return <Loading />;
  }

  return (
    <div className="grid min-h-screen pt-24 pb-8 px-4 gap-2 sm:grid-cols-12 sm:h-screen sm:px-8">
      <div className="grid gap-2 order-last sm:grid-rows-6 sm:col-span-9 sm:order-first">
        <div className="relative grid grid-cols-1 h-[480px] rounded sm:h-full sm:row-span-4 bg-gray-200">
          <div className="absolute inset-0 overflow-auto pb-2">
            <AnnouncementList announcements={team.announcements} role={team.role} />
          </div>
        </div>
        <div className="grid grid-cols-6 sm:row-span-2 gap-2 bg-white ">
          <div className="h-[200px] pr-2 col-span-6 rounded sm:h-full sm:col-span-3 bg-gray-200">
            <ProjectList projects={team.projects} members={team.members} role={team.role} />
          </div>
          <div className="h-[200px] pr-2 col-span-6 sm:h-full sm:col-span-3 bg-gray-200">
            <TaskList tasks={team.tasks} members={team.members} role={team.role} />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-2 sm:col-span-3">
        <div className="h-[50px] rounded row-span-6 sm:h-full sm:row-span-1 bg-gray-200">
          <div className="h-full flex justify-center items-center relative p-2">
            <p className="absolute text-xs text-gray-500 left-1 top-1">Invite Code:</p>
            <p className="text-3xl text-blue-400 font-bold">{team.code}</p>
          </div>
        </div>
        <div className="relative h-[160px] row-span-6 sm:h-full sm:row-span-2 bg-gray-200">
          <TeamDetails name={team.name} description={team.description} role={team.role} />
        </div>
        <div className="relative h-[240px] rounded pb-2 row-span-6 sm:h-full sm:row-span-3 bg-gray-200">
          <div className="absolute inset-0 overflow-auto pb-2">
            <MemberList members={team.members} role={team.role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
