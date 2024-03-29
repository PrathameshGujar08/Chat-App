import React, {useState, useEffect} from 'react'
import Logo from "../assets/logo.svg"
import styled from 'styled-components'

const Contacts = ({contacts, currUser, changeChat}) => {
    const [currUsername, setCurrUsername] = useState();
    const [currUserImage, setCurrUserImage] = useState();
    const [currSelected, setCurrSelected] = useState(undefined);

    useEffect(() => {
        if(currUser){
            setCurrUsername(currUser.username);
            setCurrUserImage(currUser.avatarImage);
        }
    }, [currUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrSelected(index);
        changeChat(contact);
    }

    return (<>
    {   
        currUserImage && currUsername && 
        (
        <Container>
        <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>dozy panda</h3>
                </div>
                <div className="contacts">
                    {
                        
                        contacts.map((contact, index) => { // index is an inbuilt property of map function
                            return (
                                <div className={`contact ${
                                    index === currSelected ? "selected" : ""}`}
                                key={index}
                                onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currUserImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h2>{currUsername}</h2>
                    </div>
                </div>
            </Container>
        )
    }
    </>);
}

const Container = styled.div`
    display : grid;
    grid-template-rows : 10% 75% 15%;
    overflow : hidden;
    background-color : white;
    .brand{
        display : flex;
        align-items : center;
        justify-content : center;
        border : 3px solid black;
        background-color : #909090;
        gap : 1rem;
        img {
            height : 2rem;
        }        
        h3{
            color : black;
            text-transform : uppercase;
        }
    }
    .contacts {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 1rem;
        overflow : auto;
        gap : 0.8rem;
        border : 3px solid black;
        &::-webkit-scrollbar{
            width : 0.2rem;
            &-thumb{
                background-color : #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            display : flex;
            background-color : #ffffff39;
            border : 3px solid black;
            min-height : 5rem;
            width : 90%;
            cursor : pointer;
            border-radius : 0.2rem;
            padding : 0.4rem;
            gap : 1rem;
            align-items : center;
            transition : 0.3s ease-in-out;
            .avatar{

                img{
                    height : 3rem;
                    border : 2px solid black;
                    border-radius : 50%;

                }
            }
            .username{
                h3{
                    color : black;
                }
            }
        }
        .selected {
            background-color : #bebebe;
        }
    }
    .current-user{
        background-color : #909090;
        display : flex;
        align-items : center;
        justify-content : center;
        border : 3px solid black;
        gap : 2rem;
        .avatar{
            img{
                height : 4rem;
                max-inline-size : 100%;
                border : 2px solid black;
                border-radius : 50%;
            }
        }
        .username{
            h2{
                color : black;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px){
            gap : 0.5rem;
            .username{
                h2{
                    font-size : 1rem;
                }
            }
      }
    }
    
`;

export default Contacts;