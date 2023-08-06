import { useParams } from "react-router-dom";
import { MdCheck, MdDelete } from "react-icons/md";

import { acceptRequest, declineRequest, getPendingRequest } from "../api/team";
import useAuth from "../hooks/useAuth";
import useTeam from "../hooks/useTeam";

const PendingRequestForm = () => {
  const { auth } = useAuth();
  const { teamId } = useParams();
  const { team, setTeam } = useTeam();
  const requests = team.pendingRequests;

  const handleGetRequests = async () => {
    try {
      const response = await getPendingRequest(teamId, auth.accessToken);
      setTeam((prevTeam) => ({
        ...prevTeam,
        pendingRequests: response.pendingRequests,
      }));
    } catch (err) {}
  };

  const handleAcceptRequest = async (userId) => {
    try {
      const response = await acceptRequest(teamId, userId, auth.accessToken);
      setTeam((prevTeam) => ({
        ...prevTeam,
        members: response.members,
        pendingRequests: response.pendingRequests,
      }));
    } catch (err) {}
  };

  const handleDeclineRequest = async (userId) => {
    try {
      const response = await declineRequest(teamId, userId, auth.accessToken);
      setTeam((prevTeam) => ({
        ...prevTeam,
        pendingRequests: response.pendingRequests,
      }));
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-3 justify-center overflow-auto h-full max-w-lg w-full bg-white shadow-md rounded p-4">
      <button className="self-end" onClick={handleGetRequests}>
        REFRESH
      </button>
      {requests?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="font-bold text-gray-400/50 text-center">NO REQUESTS AVAILABLE</p>
        </div>
      ) : (
        requests?.map((request) => (
          <div key={request._id} className="flex flex-row gap-2 justify-between w-full bg-gray-200 rounded-lg p-2">
            <div className="flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-rounded scrollbar-thumb-gray-400/20 scrollbar-track-transparent scrollbar-track-rounded">
              <p className="text-lg">
                {request.firstName} {request.lastName}
              </p>
            </div>
            <div className="flex flex-row gap-2 text-2xl">
              <button onClick={() => handleAcceptRequest(request._id)}>
                <MdCheck />
              </button>
              <button onClick={() => handleDeclineRequest(request._id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequestForm;
