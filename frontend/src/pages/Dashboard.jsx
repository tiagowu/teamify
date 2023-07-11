import useLoading from "../hooks/useLoading";
import TeamList from "../components/TeamList";
import Loading from "./Loading";

const Dashboard = () => {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid min-h-screen sm:h-screen pt-24 pb-8 px-4 sm:px-8 gap-4 sm:grid-rows-3">
          <div className="grid grid-cols-12 sm:row-span-2 gap-4">
            <div className="h-[480px] rounded sm:h-full col-span-12 sm:col-span-4 bg-gray-200 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-slate-300 scrollbar-track-blue-200 scrollbar-track-rounded">
              <TeamList />
            </div>
            <div className="h-[480px] sm:min-h-0 sm:h-full col-span-12 sm:col-span-8 bg-gray-300 overflow-auto">
              <div className="p-4">Annoucements</div>
            </div>
          </div>
          <div className="grid grid-cols-12 sm:row-span-1 gap-4">
            <div className="h-[160px] sm:min-h-0 sm:h-full col-span-12 sm:col-span-6 bg-gray-400 overflow-auto">
              <div className="p-4">Projects</div>
            </div>
            <div className="h-[160px] sm:min-h-0 sm:h-full col-span-12 sm:col-span-6 bg-gray-500 overflow-auto">
              <div className="p-4">Tasks</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
