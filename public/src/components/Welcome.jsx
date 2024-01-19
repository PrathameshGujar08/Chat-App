import React from 'react'
import styled from 'styled-components';
import Robot from "../assets/robot.gif";

export default function Welcome({currUser}) {
  return (
    <Container>
        <img src={Robot} alt="robot" />
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
color: white;
img{
    height: 20rem;
}
span{
    color : #4E0EFF;
}
`;

