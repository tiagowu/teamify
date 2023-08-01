import { useEffect, useState } from "react";
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
      const modifiedData = { ...data, deadline: new Date(data.deadline) };
      const response = await createProject(modifiedData, teamId, auth.accessToken);
      setMessage({ type: "success", content: response.message });
      window.location.reload();
    } catch (err) {
      if (err?.response?.data?.errors?.length > 0) {
        setMessage({ type: "error", content: err.response.data.errors[0] });
      } else {
        setMessage({ type: "error", content: err.response.data.error });
      }
    }
  };

  const renderAdditionalFields = () => {
    return <ListSelect handleChange={handleDataChange} label="Members" list={members} name="members" selected={data.members} multiple />;
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const fields = [
    { id: "create-project-name", type: "text", label: "Name", name: "name" },
    { id: "create-project-description", type: "text", label: "Description", name: "description" },
    { id: "create-project-deadline", type: "date", label: "Deadline", name: "deadline", min: currentDate },
  ];

  const disabled = data.members.length === 0;

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

  return (
    <Form
      buttonText="Create"
      data={data}
      disabled={disabled}
      fields={fields}
      handleChange={handleDataChange}
      handleSubmit={handleCreateProject}
      renderAdditionalFields={renderAdditionalFields}
    />
  );
};

export default CreateProjectForm;
