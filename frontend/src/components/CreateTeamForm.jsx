import useAuth from "../hooks/useAuth";
import { postData } from "../api/axios";
import Form from "./Form";
import { useState } from "react";

const CreateTeamForm = () => {
  const [data, setData] = useState({ name: "", description: "" });
  const { auth } = useAuth();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("teams", data, auth.accessToken);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
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
