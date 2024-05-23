import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUserRoutes } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

import { CiLight, CiDark } from 'react-icons/ci';

import { io } from 'socket.io-client';

function Chat() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [theme, setTheme] = useState("dark-theme");

  const handleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  };

  useEffect(() => {
    document.body.className = theme; // This ensures the body gets the theme class for global styles
  }, [theme]);

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [currentChat, setCurrentChat] = useState(undefined);

  const [isLoaded, setIsLoaded] = useState(false);

  // if no one is logged in
  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    };

    fetchUser();
  }, [navigate]);

  const socket = useRef();

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_HOST);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatart) {
          try {
            const response = await axios.get(`${allUserRoutes}/${currentUser._id}`);
            if (response.data.users) {
              setContacts(response.data.users);
            } else {
              toast.error("No contacts found!", toastOptions);
            }
          } catch (error) {
            toast.error("Error fetching contacts!", toastOptions);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchContacts();
  }, [currentUser, navigate, toastOptions]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container className={theme}>
      <div className="btn">
          <button className={`${theme==='dark-theme' ? 'thm-dark' : 'thm-light'}`} onClick={handleTheme}>
            {theme === 'dark-theme' ? <CiLight size={22}/> : <CiDark size={22}/>}
          </button>
      </div>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            isLoaded && <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )
        }
      </div>
    </Container>
  );
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  &.dark-theme {
    background-color: #131324;
    color: #E0E0E0;
  }
  &.light-theme {
    background-color: #FFFFFF;
    color: #121212;
  }
  .btn{
    display: flex;
    justify-content: end;
    width: 85%;
  }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #1E1E1E;
    display: grid;
    grid-template-columns: 27% 73%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    &.light-theme & {
      background-color: #F5F5F5;
    }
  }
  .thm-dark {
    background-color: #444444; // Dark gray background
    border: 2px solid #BB86FC; // Border color for dark theme
    border-radius: 50%;
    cursor: pointer;
    font-size: 2rem;
    color: #BB86FC;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #555555; // Slightly darker gray on hover
      color: #6200EE;
    }
    svg {
      width: 2rem;
      height: 2rem;
      color:white;
    }
  }
  .thm-light {
    background-color: #DDDDDD; // Light gray background
    border: 2px solid #D9BFFF; // Border color for light theme
    border-radius: 50%;
    cursor: pointer;
    font-size: 2rem;
    color: #6200EE;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #CCCCCC; // Slightly darker gray on hover
      color: #BB86FC;
    }
    svg {
      width: 2rem;
      height: 2rem;
      color:#000;
    }
  }
`;

export default Chat;
