import { useState } from "react";
import { useParams } from "react-router-dom";

import { createProject } from "../api/team";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";
import ListSelect from "./ListSelect";

const CreateProjectForm = ({ members }) => {
  const [data, setData] = useState({ name: "", description: "", members: [], deadline: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();
  const { teamId } = useParams();

  const handleDataChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "members") {
      if (checked) {
        setData((prevData) => ({
          ...prevData,
          members: [...prevData.members, value],
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          members: prevData.members.filter((memberId) => memberId !== value),
        }));
      }
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject({ ...data, deadline: new Date(data.deadline) }, teamId, auth.accessToken);
      console.log(response.data);
      setMessage({ type: "success", content: response.data.message });
      window.location.reload();
    } catch (err) {
      setMessage({ type: "error", content: err.response.data.error });
    }
    setData({ name: "", description: "", members: [], deadline: "" });
  };

  const renderAdditionalFields = () => {
    return (
      <>
        <ListSelect handleChange={handleDataChange} label="Members" list={members} name="members" selected={data.members} />
        <label className="text-blue-400 text-sm mt-4">Deadline</label>
        <input
          type="date"
          id="create-project-date"
          className="border border-gray-300 p-2 rounded"
          name="deadline"
          value={data.deadline}
          onChange={handleDataChange}
        />
      </>
    );
  };

  const fields = [
    { id: "create-project-name", type: "text", label: "Name", name: "name" },
    { id: "create-project-description", type: "text", label: "Description", name: "description" },
  ];

  return (
    <Form
      buttonText="Create"
      data={data}
      fields={fields}
      handleChange={handleDataChange}
      handleSubmit={handleCreateProject}
      renderAdditionalFields={renderAdditionalFields}
    />
  );
};

export default CreateProjectForm;
