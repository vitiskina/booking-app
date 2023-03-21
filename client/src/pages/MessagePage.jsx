import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import socketIOClient from "socket.io-client";

const MessagePage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [getMessages, setGetMessages] = useState([]);
  const { user } = useContext(UserContext);

  const senderClass = "flex flex-col items-end mt-auto mr-4";
  const receiverClass = "mb-5 mt-auto ml-4";

  //scroll to bottom
  

  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [getMessages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

//   if(renderMess){
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
  //socket
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:4000");

    socketRef.current.on("sendDataServer", (dataGot) => {
      setGetMessages((oldMsgs) => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`/messages/${id}`).then((res) => {
        setGetMessages(res.data);
      });
    }
  }, [getMessages]);

  async function sendMessage() {
    if (message === "") return;
    const msg = {
      message: message,
      receiver: id,
      sender: user._id,
    };
    socketRef.current.emit("sendDataClient", msg);
    await axios.post("/messages", msg).then((res) => {
      setMessage("");
    });
  }

  const renderMess = getMessages.map((message, index) => (
    <div
      key={index}
      className={message.sender._id === user._id ? senderClass : receiverClass}
    >
      <h2 className="font-bold text-primary">
        {/* {message.sender._id !== user._id
            ? `${message.sender.name}`
            : `${message.sender.name}`} */}
        {message.sender.name}
      </h2>
      <p>{message.content}</p>
    </div>
  ));

  return (
    <div className="mt-12 flex justify-center items-center">
      <div className="flex flex-col mx-20 ">
        <div
          className="overflow-hidden hover:overflow-y-scroll flex flex-col justify-between border-t
      border-l border-r border-gray-300  w-[800px] h-[500px]  rounded-t-xl mt-10 "
        >
          {renderMess}
          {/* {getMessages.length > 0 &&
              getMessages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender._id === user._id
                      ? senderClass
                      : receiverClass
                  }
                >
                  <h2 className="font-bold text-primary">
               
                    {message.sender.name}
                  </h2>
                  <p>{message.content}</p>
                </div>
              ))} */}

          <div ref={messagesEndRef} />
        </div>

        <div className=" flex gap-2 text-center justify-center items-center border rounded-b-xl border-gray-300 h-fit  p-2">
          <input
            className="h-8  hover:outline-primary focus:outline-primary "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="h-8 px-4 bg-primary text-white rounded-2xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
