import { useState } from "react";

import { createTeam } from "../api/user";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";

const CreateTeamForm = () => {
  const [data, setData] = useState({ name: "", description: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam(data, auth.accessToken);
      setMessage({ type: "success", content: response.data.message });
      window.location.reload(); // TODO: Navigate to newly created team homepage
    } catch (err) {
      setMessage({ type: "error", content: err.response.data.error });
    }
    setData({ name: "", description: "" });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fields = [
    { id: "create-name", type: "text", label: "Name", name: "name" },
    { id: "create-description", type: "text", label: "Description", name: "description" },
  ];

  return <Form buttonText="Create" data={data} fields={fields} handleChange={handleDataChange} handleSubmit={handleCreateTeam} />;
};

export default CreateTeamForm;
