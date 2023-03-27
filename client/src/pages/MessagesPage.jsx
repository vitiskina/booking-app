import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const MessagesPage = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  console.log(messages);

  useEffect(() => {
    axios.get(`/messages`).then(({ data }) => {
      setMessages(data);
    });
  }, []);

  return (
    <div className="">
      <h1 className="text-primary text-2xl font-extrabold">Messages Recently:</h1>
      {messages.map((message) => {
        return (
          <Link to={`/account/messages/${message.receiver._id}`} className="h- mt-10 flex flex-col items-center justify-start ">
            <h3 className=" font-bold text-primary text-xl">{message.receiver.name}  send to you</h3>
            <p>{message.content}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MessagesPage;
