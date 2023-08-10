import React, { useEffect, useState } from 'react';
import { subDays, subHours } from 'date-fns';
import { Avatar, Box, Button, Container, CssBaseline, Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { io } from 'socket.io-client';
import * as Yup from "yup";
import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Label } from 'recharts';
import { LabelImportant } from '@mui/icons-material';

const SOCKET_URL = 'http://172.16.77.34:8080/chat';


export default function ChattingPage() {
 


    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(true);
    const [trigger, setTrigger] = useState("");
    const [recipientUserName, setRecipientUserName] = useState(""); 
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState("")
    const [socket, setSocket] = useState(null);
    
  
  
  
    const handleChatMessage = (msg) => {
      console.log('New message:', msg);
      setResponse(msg?.message);
    };
  
   const handleChangeStep = () => {
        if(step===1){
            setStep(2);
            setTrigger(!trigger);
        }
    }
  
  
    useEffect(() => {
        if (step === 2 && userName && !socket) {
          const newSocket = io(SOCKET_URL, { query: { userName } });
          setSocket(newSocket);
      
          return () => {
            newSocket.disconnect();
          };
        }
      }, [step, userName]);
      
      useEffect(() => {
        if (socket) {
          socket.on('chat', handleChatMessage);
          
      
          return () => {
            socket.off('chat', handleChatMessage);
           
          };
        }
      }, [socket]);
  
    const sendMessage = (msg) => {
      console.log("se envia: " + msg);
      if (socket) {
        const chatMessage = {
          userName: userName,
          message: msg,
          recipientUserName: recipientUserName
        };
        socket.emit('chat', chatMessage);
        setTrigger(!trigger);
      }
  
    };
  

  return (
    <>
    <Box>

{step === 1 && (<Box>
    <TextField
label="usuario:"
value={userName}
onChange={(e)=> setUserName(e.target.value)}
placeholder="Ingresa el username aquí"
/>
<Button variant="outlined" onClick={()=>{handleChangeStep()}}>crear</Button>
   </Box>)}

{step === 2 && (<Box>
    
    <LabelImportant/>Hola





<TextField
label="Destinatario:"
value={recipientUserName}
onChange={(e)=> setRecipientUserName(e.target.value)}
placeholder="Ingresa el username destinatario aquí"
/>

<TextField 
label="Mensaje:"
value={message}
onChange={(e)=> setMessage(e.target.value)}
placeholder="mensaje:"
/>

<Button
  variant="text"
  title="Ingresar"
  onClick={() => sendMessage(message)}
  compact
  style={{ marginEnd: 4 }}
>enviar</Button>
<Typography variant='h3'>conectado: {userName}</Typography>
<Typography variant='h3'>Ultima respuesta: {response}</Typography>

    
    </Box>)}    






    </Box>      
    </>
  );
}