import { useEffect, useState } from "react";

import { joinTeam } from "../api/user";
import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import Form from "./Form";

const JoinTeamForm = () => {
  const [data, setData] = useState({ code: "" });
  const { auth } = useAuth();
  const { setMessage } = useMessage();

  const handleKeyDown = (e) => {
    const key = e.key;
    if (!/^[a-zA-Z0-9]$/.test(key) && key !== "Backspace" && key !== "Enter") {
      e.preventDefault();
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await joinTeam({ code: data.code }, auth.accessToken);
      setMessage({ type: "success", content: response.message });
    } catch (err) {
      setMessage({ type: "error", content: err.response.data.error });
    }
    setData({ code: "" });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
  };

  const fields = [{ id: "join-code", type: "text", label: "Code", name: "code", onKeyDown: handleKeyDown, maxLength: 6 }];

  const disabled = data.code.length < 6;

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

  return <Form buttonText="Join" data={data} disabled={disabled} fields={fields} handleChange={handleDataChange} handleSubmit={handleJoinTeam} />;
};

export default JoinTeamForm;
