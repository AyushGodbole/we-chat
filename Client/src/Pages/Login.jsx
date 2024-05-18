import React, { useState , useEffect} from "react";
import styled from 'styled-components';
import { Link , useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

// import axios for hitting urls
import axios from 'axios';

// Importing ToastContainer and toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
// Importing the CSS file for toast
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from "../utils/ApiRoutes";

function Login() {


    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  }

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });

    // check if someone already logged in
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/');
        }
    },[])

    const handleValidation = () => {
        const { username, password } = userInput;

        if(username===""){
            toast.error("username can't be empty!", toastOptions);
            return false;
        }

        else if(password==="") {
            toast.error("Password can't be empty", toastOptions);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            // Sending data to backend
            try {
                const response = await axios.post(loginRoute, userInput);
                if (response.data.status === true) { // Corrected typo here
                    toast.success("User logged in successfully",toastOptions);
                    localStorage.setItem('chat-app-user', JSON.stringify(response.data.userData));
                    navigate('/'); // Move this line inside the if block
                } else {
                    // Handle registration failure (optional)
                    toast.error(response.data.message,toastOptions);
                }
            } catch (error) {
                // Handle request error (optional)
                toast.error("login failed",toastOptions);
                console.error("login error:", error);
            }
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>We-Chat</h1>
                    </div>

                    <input type="text" placeholder="Username" name="username" value={userInput.username} onChange={handleChange} />

                    <input type="password" placeholder="Password" name="password" value={userInput.password} onChange={handleChange} />

                    <button type="submit">Login In</button>
                    <span>don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
