import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { createTask } from "../api/team";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";
import ListSelect from "./ListSelect";

const CreateTaskForm = ({ members }) => {
  const [data, setData] = useState({ name: "", description: "", assignedTo: "", deadline: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();
  const { teamId } = useParams();

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const modifiedData = { ...data, deadline: new Date(data.deadline) };
      const response = await createTask(modifiedData, teamId, auth.accessToken);
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
    return <ListSelect handleChange={handleDataChange} label="Members (Select One)" list={members} name="assignedTo" selected={data.assignedTo} />;
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const fields = [
    { id: "create-project-name", type: "text", label: "Name", name: "name" },
    { id: "create-project-description", type: "text", label: "Description", name: "description" },
    { id: "create-project-deadline", type: "date", label: "Deadline", name: "deadline", min: currentDate },
  ];

  const disabled = !data.assignedTo || data.deadline < currentDate;

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
      handleSubmit={handleCreateTask}
      renderAdditionalFields={renderAdditionalFields}
    />
  );
};

export default CreateTaskForm;
