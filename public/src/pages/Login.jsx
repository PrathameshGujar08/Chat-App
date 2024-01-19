import React, { useState, useEffect }from 'react'
import { Link , useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from 'react-toastify'; // Toastcontainer is component to show the error notif which is default at top right we need to change it if needed (Read docs)
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  // UseState hook to get values in the form
  const [values, setValues] = useState({
    name : "",
    password : "",
  })

  const toastconf = {
    position :  toast.POSITION.BOTTOM_RIGHT,
    autoClose : 8000,
    draggable : true,
    pauseOnHover : true,
    theme : 'dark',
  };

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  }, [])

  // Functions declared in the return statements are defined here.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation())
    {
      const {username, password} = values;
      // console.log(values);
      const { data } = await axios.post(loginRoute, {
        username, 
        password,
      })
      if(data.status === false)
      {
        toast.error(data.msg, toastconf);
      }
      if(data.status === true)
      {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/")
      }
    }
  }
  
  const handleValidation = () => {
    const {username, password} = values; 
    if(password === ""){
      toast.error("Your Password is required.", toastconf);
      return false;
    }
    else if(username.length === ""){
      toast.error("Username is required.", toastconf);
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name] : event.target.value})
    // We destructure and change the value directly
    // To see how this works
    // var n = event.target.name;
    // console.log(n + "=" + event.target.value);
  }

  return (
    <>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>snappy</h1>
        </div>
        <input 
        type="text" 
        placeholder="Username" 
        name="username"
        onChange={(e) => handleChange(e)}
        min = "3"
        />
        <input 
        type="password" 
        placeholder="Password" 
        name="password"
        onChange={(e) => handleChange(e)}
        />
        <button type='submit'>Login</button>
        <span>
        Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

// Note that it would be a component so it should start with capital letter

const FormContainer = styled.div` 
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  justify-content : center;
  gap : 1rem;
  align-items : center;
  background-color : #131324;
  .brand{
    display : flex;
    align-items : center;
    gap : 1rem;
    justify-content : center;
    img{
      height : 5rem;
    }
    h1{
      color : white;
      text-transform : uppercase;
    }
  }
  form{
    display : flex;
    flex-direction : column;
    gap: 2rem;
    background-color: #00000076;
    border-radius : 30px;
    padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding : 1rem;
      border-radius : 1rem;
      border : 0.1rem solid blue; 
      ${'' /* border : border-width border-style border color */}
      color : white;
      width : 100%;
      font-size : 1rem;
      &:focus{
        border : 0.1rem solid yellow;
        outline : none;
      }
    }
    button{
      background-color : #580391;
      padding : 1rem 2rem;
      font-size : 1rem;
      width:100%;
      color : white;
      border : none;
      border-radius : 0.4rem;
      cursor : pointer;
      font-weight : bold;
      text-transform : uppercase;
      transition : 0.5s ease-in-out;
      &:hover{
        background-color : #f5fa5f;
        color: black;
      }
    }
    span{
      color : #ffda08;
      padding : 0.5rem;
      text-transform : uppercase;
      a{
        font-weight : bold;
      }
    }
  }
`;

export default Login