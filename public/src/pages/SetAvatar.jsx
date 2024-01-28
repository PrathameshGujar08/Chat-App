import React, { useState, useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Loader from "../assets/loader.gif"
import { ToastContainer, toast } from 'react-toastify'; // Toastcontainer is component to show the error notif which is default at top right we need to change it if needed (Read docs)
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer';


export default function SetAvatar() {
    const api = 'https://api.multiavatar.com';
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastconf = {
        position :  toast.POSITION.BOTTOM_RIGHT,
        autoClose : 8000,
        draggable : true,
        pauseOnHover : true,
        theme : 'dark',
      };

      useEffect(() => {
        if(!localStorage.getItem("chat-app-user")){
          navigate("/login");
        }
      }, [])

    const setProfilePicture = async () => {
      if(selectedAvatar === undefined)
      {
        toast.error("Please select a Avatar", toastconf);
      }
      else{
        // Parses a normal string to give output as JSON object.
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}` ,{ 
        image : avatars[selectedAvatar],
      })
      // console.log(data)
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.userImage;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate("/");
      }
      else
      {
        toast.error("Try again", toastconf);
      }
      }
    };
    
    // Here the mistake was to use async directly with useEffect which would give you destroy object not found error.
    const fetchAvatars = async () => {
      const data = [];
      try
      {
        for(let i = 0; i < 4; i++)
      {
          const apinumber = Math.round(Math.random() * 1000);
          const image = await axios.get(`${api}/${apinumber}`);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"))
      }
      setAvatars(data);
      setIsLoading(false);
    }
    catch(error){
      if (error.response && error.response.status === 429) {
        console.log('Rate limit exceeded. Retry after 1 min delay.');
        // Implement your retry logic here
      } else {
        console.error('Error:', error);
        // Handle other errors
      }
    }
  }

    useEffect(() => {
    fetchAvatars();  
    }, [])

  return(
    <>
    {
        (isLoading)?
        <Container>
          <img src={Loader} alt="loader" />
        </Container> :
        (<Container>
            <div className="title-container">
              <h1>Pick an Avatar for you</h1>
            </div>
      
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div 
                  key = {index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                  }`}>
                  {/* {console.log(index)} */}
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                    onClick={() => setSelectedAvatar(index)}
                  />
                  </div>)
              })}
            </div>
            <button className="submit-btn"
            onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        )}

        <ToastContainer />
    </>
      );

    }
    
    const Container = styled.div`
      display : flex;
      justify-content : center;
      align-items : center;
      flex-direction : column;
      gap : 3 rem;
      background-color : #131324;
      height : 100vh;
      width : 100vw;
      .loader{
        max-inline-size : 100%;
      }

      .title-container{
        h1{
          color : white;
          padding : 2rem;
          }
      }

      .avatars{
        display : flex;
        gap : 2rem;

        .avatar{
          border : 0.4 rem solid tranparent;
          padding : 1rem;
          border-radius : 5rem;
          display : flex;
          justify-content : center;
          align-content : center;
          transition : 0.5 ease-in-out;
          color : white;

          img {
            height : 6rem;
            border: 0.1rem;
          } 
        }

        .selected {
          border : 0.2rem solid #4e0eff;
        }
      }

      button{
        position:flex;
        background-color : #580391;
        padding : 1rem 2rem;
        font-size : 1rem;
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
`;