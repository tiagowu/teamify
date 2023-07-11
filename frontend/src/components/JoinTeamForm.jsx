import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
// import useLoading from "../hooks/useLoading";
import { postData } from "../api/axios";
// import Loading from "../pages/Loading";
import Form from "./Form";
import { useState } from "react";

const JoinTeamForm = () => {
  const [data, setData] = useState({ code: "" });
  const [message, setMessage] = useState({ type: "", content: "" });
  // const { isLoading, setIsLoading } = useLoading();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    const key = e.key;
    if (!/^[a-zA-Z0-9]$/.test(key) && key !== "Backspace" && key !== "Enter") {
      e.preventDefault();
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true);
      await postData("teams/join", { code: data.code }, auth.accessToken);
    } catch (err) {
      // console.log(err.response.data.error);
      setMessage({ type: "error", content: err.response.data.error });
    } finally {
      setTimeout(() => {
        // setIsLoading(false);
        navigate("/dashboard", { replace: true });
      }, 200);
    }
    setData({ code: "" });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
  };

  const fields = [{ id: "join-code", type: "text", label: "Code", name: "code", onKeyDown: handleKeyDown, maxLength: 6 }];

  const disabled = data.code.length < 6;

  return (
    <Form
      buttonText="Join"
      data={data}
      disabled={disabled}
      fields={fields}
      handleChange={handleDataChange}
      handleSubmit={handleJoinTeam}
      message={message}
    />
  );
};

export default JoinTeamForm;
