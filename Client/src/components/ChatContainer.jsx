import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { toast } from "react-toastify";

import {v4 as uuidv4} from 'uuid';

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]); // Ensure messages state is declared at the top
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();

    const handleSendMessage = async (msg) => {
        const response = await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: msg }]);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (msg) => {
              // console.log('msg-rec',msg);
                setArrivalMsg({ fromSelf: false, message: msg });
            });
        }
    }, [socket]);

    useEffect(() => {
        if (arrivalMsg) {
            setMessages((prev) => [...prev, arrivalMsg]);
        }
    }, [arrivalMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    const handleUserMessages = async () => {
        if(currentChat){
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
        });

        // console.log(response.data);
        setMessages(response.data);
        }
    };

    useEffect(() => {
        if (currentChat) {
            handleUserMessages();
        }
    }, [currentChat]);

    return (
        currentChat && 
        <>
            <Container>
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            <img 
                                src={`data:image/png;base64,${currentChat.avatarImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    <Logout />
                </div>
                
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={uuidv4()}>
                            <div className={`message ${msg.fromSelf ? 'sended' : 'received'}`}>
                                <div className="content">
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef}></div>
                </div>
                <div className="chat-input">
                    <ChatInput handleSendMessage={handleSendMessage} />
                </div>
            </Container>
        </>
    );
}

export default ChatContainer;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
