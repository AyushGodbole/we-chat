import React, { useState } from "react";
import styled from 'styled-components';
import { Link , useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

// import axios for hitting urls
import axios from 'axios';

// Importing ToastContainer and toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
// Importing the CSS file for toast
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from "../utils/ApiRoutes";

function Register() {

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleValidation = () => {
        const { username, email, password, confirm_password } = userInput;

        if (!username || !email || !password || !confirm_password) {
            toast.error("Please fill all details!", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;
        }

        else if(username.length<3){
            toast.error("Too small username!", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;
        }

        else if(password.length<6) {
            toast.error("Password should be minimum of 6 characters", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;
        }

        else if(password !== confirm_password) {
            toast.error("Passwords do not match!", {
                position: "bottom-right",
                autoClose: 8000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            // Sending data to backend
            try {
                const response = await axios.post(registerRoute, userInput);
                if (response.data.status === true) { // Corrected typo here
                    toast.success("User registered successfully");
                    localStorage.setItem('chat-app-user', JSON.stringify(response.data.userData));
                    navigate('/'); // Move this line inside the if block
                } else {
                    // Handle registration failure (optional)
                    toast.error("Registration failed");
                }
            } catch (error) {
                // Handle request error (optional)
                toast.error("Registration failed");
                console.error("Registration error:", error);
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

                    <input type="email" placeholder="Email" name="email" value={userInput.email} onChange={handleChange} />

                    <input type="password" placeholder="Password" name="password" value={userInput.password} onChange={handleChange} />

                    <input type="password" placeholder="Confirm Password" name="confirm_password" value={userInput.confirm_password} onChange={handleChange} />

                    <button type="submit">Create User</button>
                    <span>Already have an account? <Link to="/login">Login</Link></span>
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

export default Register;
