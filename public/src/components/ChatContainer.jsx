import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    const getMessages = async () =>
    {
        if (currChat) {
            const response = await axios.post(getMessagesRoute, {
                from: currentUser._id,
                to: currChat._id,
            });
            setMessages(response.data);
        }
    }

    useEffect(()=>{
        if(socket.current)
        {
            socket.current.on("msg-recieve", (msg) => {
                console.log(msg);
                setArrivalMessage({fromself : false, message : msg})
            })
        }
    }, [])

    useEffect(()=>{
        arrivalMessage && setMessages((prev) => [...prev , arrivalMessage])

    }, [arrivalMessage])
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);
    

    useEffect(() => {
        getMessages()
    }, [currChat])


    const handleSendMessage = async (msg) => {
        await axios.post(sendMessageRoute, {
            from : currentUser._id,
            to : currChat._id,
            message : msg,
        });

        socket.current.emit("send-msg", {
            to : currChat._id,
            from : currentUser._id,
            message : msg
        });

        const msgs = [...messages];
        msgs.push({fromself : true, message : msg});
        setMessages(msgs)
    };

  return (
    <>
    {currChat &&       
    <Container>
    <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currChat.avatarImage}`} alt="avatar" />
            </div>
            <div className="username">
                <h3>{currChat.username}</h3>
            </div>
        </div>
        <Logout />
    </div>
    <div className="chat-messages">
        {
            messages.map((message) => {
                return (<div ref = {scrollRef} key = {uuidv4()} >
                    <div className={`message ${message.fromself ? "sended" : "recieved"}`}>
                        <div className="content">
                            <p>
                                {message.message}
                            </p>
                        </div>
                    </div>
                </div>)
            })
        }
    </div>
    <ChatInput handleSendMsg = { handleSendMessage }/>
    </Container>
        }
    </>
  )
}

const Container = styled.div`
    padding : 1rem;
    display : grid;
    grid-template-rows : 10% 80% 10%;
    gap : 0.1rem;
    overflow : hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-template-columns: 15% 70% 15%;
    }
    .chat-header{
        display : flex;
        justify-content : space-between;
        align-items : center;
        padding : 0 2rem;
        .user-details{
            display :flex;
            align-item :center;
            gap : 1rem;
            .avatar{
                img{
                   height : 3rem; 
                }
            }
            .username{
                h3{
                padding : 1rem 0rem;
                color : white;
                }
            }
        }  
    }
    .chat-messages{
        padding : 1rem 2rem;
        display : flex;
        flex-direction : column;
        gap : 0.8rem;
        overflow : auto;
        &::-webkit-scrollbar{
            width : 0.2rem;
            &-thumb{
                background-color : #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display : flex;
            align-items : center;
            .content{
                max-width : 40%;
                overflow-wrap : break-word;
                padding : 1rem;
                font-size : 1.1rem;
                border-radius : 1rem;
                color : #d1d1d1
            }
        }
        .sended{
            justify-content : flex-end;
            .content{
                background-color : #4F04FF21
            }
        }
        .recieved{
            justify-content : flex-start;
            .content{
                background-color : #9900FF20;
            }
        }
    }
`;
export default ChatContainer