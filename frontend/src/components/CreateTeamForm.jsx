import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTeam } from "../api/user";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";

const CreateTeamForm = () => {
  const [data, setData] = useState({ name: "", description: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam(data, auth.accessToken);
      setMessage({ type: "success", content: response.message });
      const teamId = response.teamId;
      navigate(`/team/${teamId}`, { replace: true });
    } catch (err) {
      if (err?.response?.data?.errors?.length > 0) {
        setMessage({ type: "error", content: err.response.data.errors[0] });
      } else {
        setMessage({ type: "error", content: err.response.data.error });
      }
    }
    setData({ name: "", description: "" });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

  const fields = [
    { id: "create-team-name", type: "text", label: "Name", name: "name" },
    { id: "create-team-description", type: "text", label: "Description", name: "description" },
  ];

  return <Form buttonText="Create" data={data} fields={fields} handleChange={handleDataChange} handleSubmit={handleCreateTeam} />;
};

export default CreateTeamForm;
