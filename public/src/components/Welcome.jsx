import React from 'react'
import styled from 'styled-components';
import welcome_panda from "../assets/welcome_panda.gif";

export default function Welcome({currUser}) {
  return (
    <Container>
        <img src={welcome_panda} alt="welcome_panda" />
        <h1>Welcome <span>{currUser.username}!</span></h1>
        <h2>Please select a user to start chatting..</h2>
    </Container>
  )
}

const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
color: #636363;
border : 3px solid black;
img{
    height: 20rem;
}
span{
    color : black;
}
`;

