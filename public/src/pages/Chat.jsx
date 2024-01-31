import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import chat_bg from "../assets/chat_bg.jpg"
import { allUsersRoute, host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client';

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currUser, setcurrUser] = useState(undefined);
  const [currChat, setcurrChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);

  const checkcurrUser = async () => {
    if(!localStorage.getItem("chat-app-user"))
    {
      navigate("/login");
    }
    else
    {
      setcurrUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setisLoaded(true);
    }
  }

  useEffect(() => {
    if(currUser){
      socket.current = io(host, { transports : ['websocket'] }); //APIRoutes
      socket.current.emit("add-user", currUser._id)

    }
  }, [currUser]);

  const fetchContacts = async (currUser) => {
    if(currUser)
    {
      if(currUser.isAvatarImageSet)
      {
        const { data } = await axios.get(`${allUsersRoute}/${currUser._id}`);
        setContacts(data);
      }
      else{
        navigate("/setAvatar")
      }
    }
  }

  useEffect(() => {
    checkcurrUser();
  }, [])


  useEffect(() => {
    fetchContacts(currUser)
  }, [currUser])

  // As you can see in the below css you defined grid template columns so they work by dividing the elements such as contacts will be shown in first 25% division and next tag will be shown in 75% division
  // 

  const handleChatChange = (chat) =>{
    setcurrChat(chat);
  }

  return (
    <>
        <Container style={{  
        backgroundImage: `url(${chat_bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }}>
        <div className="container">
          <Contacts contacts = {contacts} currUser = {currUser} changeChat = {handleChatChange} />
          {console.log(currUser)}
          {(isLoaded && (currChat === undefined))? (
          <Welcome currUser={currUser}/> )
          : (
          <ChatContainer 
            currChat={ currChat } 
            currentUser={ currUser } 
            socket = { socket }/>
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    display : flex;
    flex-direction : column;
    justify-content : center;
    gap : 1rem;
    align-items : center;
    background-color : #131324;
    .container{
      height : 85vh;
      width : 85vw;
      background-color : white;
      display : grid;
      grid-template-columns : 25% 75%;
      @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-template-columns: 35% 65%;
      }
    }
`

export default Chat