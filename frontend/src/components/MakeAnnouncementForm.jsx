import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { makeAnnouncement } from "../api/team";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";

const MakeAnnouncementForm = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();
  const { teamId } = useParams();

  const handleMakeAnnouncement = async (e) => {
    e.preventDefault();
    console.log("HERE");
    try {
      const response = await makeAnnouncement(data, teamId, auth.accessToken);
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
    { id: "make-announcement-title", type: "text", label: "Title", name: "title" },
    { id: "make-announcement-content", type: "textarea", label: "Announcement", name: "content", rows: 6 },
  ];

  return <Form buttonText="Create" data={data} fields={fields} handleChange={handleDataChange} handleSubmit={handleMakeAnnouncement} />;
};

export default MakeAnnouncementForm;
