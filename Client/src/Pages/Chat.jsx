import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUserRoutes } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [currentChat,setCurrentChat] = useState(undefined);

  const [isLoaded,setIsLoaded] = useState(false);

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

  const handleChatChange = (chat)=>{
        setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}  changeChat={handleChatChange}/>
        {
          isLoaded && currentChat===undefined ? (
            <Welcome currentUser={currentUser}/>
          ):
          (
            <ChatContainer currentUser={currentUser}/>
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
