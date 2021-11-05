import React from "react";
import { ChatEngine } from "react-chat-engine";
import { useSelector } from "react-redux";
import "./chat.css";
const Chat = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <ChatEngine
      height="100vh"
      userName={auth.user.email}
      userSecret="123456"
      projectID="3a749869-1abb-4bd5-8a4a-9d34ba95e983"
    />
  );
};

export default Chat;
