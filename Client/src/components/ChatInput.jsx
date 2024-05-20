import React, { useState } from "react";
import styled from "styled-components";
import Picker from 'emoji-picker-react';

import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

function ChatInput({handleSendMessage}){

    const [emojiPicker,setEmojiPicker] = useState(false);

    const [msg,setMsg] = useState("");

    // emoji picker logic
    const handleEmojiPicker = ()=>{
        setEmojiPicker(!emojiPicker);
    }

    // append emoji with message
    const handleEmojiAndMessage = (e,emoji)=>{
        let message = msg;
        message += e.emoji;
        setMsg(message);
        setEmojiPicker(!emojiPicker);
    }

    // logic to send chat
    const sendChat = (e)=>{
        e.preventDefault();

        if(msg.length>0){
            handleSendMessage(msg);
            setMsg("");
        }
    }

    return(
        <>
            <Container>
                <div className="button-container">
                    <div className="emoji">
                        <BsEmojiSmileFill onClick={handleEmojiPicker}/>
                        {
                            emojiPicker && <Picker onEmojiClick={handleEmojiAndMessage}/>
                        }
                    </div>
                </div>

                <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                        <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                        <button type="submit">
                            <IoMdSend/>
                        </button>
                </form>
            </Container>
        </>
    )
}

export default ChatInput;

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .epr-main {
        position: absolute;
        bottom: 54px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search-container input{
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;