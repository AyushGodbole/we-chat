import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Loader from '../assets/loader.gif';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from "../utils/ApiRoutes";

// Import Buffer from the buffer module
import { Buffer } from 'buffer';

function SetAvatar() {

    // RoboHash API
    const avatarAPI = `https://robohash.org`;
    
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    
    // set the loader
    const [isLoading, setIsLoading] = useState(true);

    const [selectedAvatar, setSelectedAvatar] = useState(undefined);


    // check if no user is loggen in , he cannot acces setAvatar page
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }
    },[])

    // get the random avatars
    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const seed = Math.random().toString(36).substring(7);
                    const response = await axios.get(
                        `${avatarAPI}/${seed}.png`,
                        { responseType: 'arraybuffer' }
                    );
                    // Convert the response data to a base64 string using Buffer
                    const buffer = Buffer.from(response.data, 'binary');
                    data.push(buffer.toString('base64'));
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    toast.error("Too many requests. Please try again later.");
                } else {
                    toast.error("Failed to load avatars. Please try again.");
                }
                setIsLoading(false);
            }
        };
        fetchAvatars();
    }, []);

    const handleAvatarClick = (index) => {
        setSelectedAvatar(index);
    };

    // set it as profile picture
    const setProfilePicture = async () => {
        try {
            if (selectedAvatar === undefined) {
                toast.error("Please select an avatar");
                return;
            }
            else {
                const user = await JSON.parse(localStorage.getItem('chat-app-user'));

                const response = await axios.post(`${setAvatarRoute}/${user._id}`,{
                    image:avatars[selectedAvatar],
                });

                if(response.data.isSet){
                    user.isAvatart = response.data.isSet;
                    user.avatarImage = response.data.image;
                    localStorage.setItem('chat-app-user',JSON.stringify(user));
                    navigate('/');
                }
            }
            // console.log("Selected Avatar Index:", selectedAvatar);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <Container>
                        <img src={Loader} alt="loader" className="loader" />
                    </Container>
                ) : (
                    <Container>
                        <div className="title-container">
                            <h1>Pick an avatar</h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, idx) => (
                                <div
                                    className={`avatar ${selectedAvatar === idx ? "selected" : ""}`}
                                    key={idx}
                                >
                                    <img
                                        src={`data:image/png;base64,${avatar}`}
                                        alt="avatar"
                                        onClick={() => handleAvatarClick(idx)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={setProfilePicture} className="submit-btn">
                            Set Profile Picture
                        </button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
