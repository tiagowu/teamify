import { useEffect, useState } from "react";

import { getAnnouncements, getProjects, getTasks, getTeams } from "../api/team";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";

import Error from "./Error";
import Loading from "./Loading";

import ProjectList from "../components/ProjectList";
import TeamList from "../components/TeamList";
import TaskList from "../components/TaskList";
import AnnouncementList from "../components/AnnouncementList";

const Dashboard = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(null);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [annoucements, setAnnoucements] = useState([]);

  const { auth } = useAuth();
  const { message, setMessage } = useMessage();

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await getTeams(auth.accessToken);
        setTeams(teamsResponse.teams);

        const projectsResponse = await getProjects(auth.accessToken);
        setProjects(projectsResponse.projects);

        const tasksResponse = await getTasks(auth.accessToken);
        setTasks(tasksResponse.tasks);

        const announcementsResponse = await getAnnouncements(auth.accessToken);
        setAnnoucements(announcementsResponse.announcements);

        setIsDataLoaded(true);
      } catch (err) {
        setMessage({ type: "error", content: err.response.data.error });
      }
    };

    fetchData();
  }, [auth.accessToken, setMessage]);

  if (!isDataLoaded && message.type === "error" && message.content) {
    return <Error message={message.content} />;
  }

  if (!isDataLoaded) {
    return <Loading />;
  }

  return (
    <div className="grid min-h-screen sm:h-screen pt-24 pb-8 px-4 sm:px-8 gap-4 sm:grid-rows-3">
      <div className="grid grid-cols-12 sm:row-span-2 gap-4">
        <div className="h-[480px] rounded pb-2 sm:h-full col-span-12 sm:col-span-4 bg-gray-200 overflow-auto">
          <TeamList teams={teams} />
        </div>
        <div className="h-[480px] rounded pb-2 sm:h-full col-span-12 sm:col-span-8 bg-gray-200 overflow-hidden">
          <AnnouncementList announcements={annoucements} />
        </div>
      </div>
      <div className="grid grid-cols-12 sm:row-span-1 gap-4">
        <div className="h-[160px] rounded pr-2 sm:h-full col-span-12 sm:col-span-6 bg-gray-200 overflow-hidden">
          <ProjectList projects={projects} />
        </div>
        <div className="h-[160px] rounded pr-2 sm:h-full col-span-12 sm:col-span-6 bg-gray-200 overflow-hidden">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
