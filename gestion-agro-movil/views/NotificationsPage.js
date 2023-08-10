import { Text } from "react-native";
import { Button, View } from "react-native";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRoute } from '@react-navigation/native';
import { TextInput } from "@react-native-material/core";



const NotificationsPage = (props) => {

  const route = useRoute();
  const { userName } = route.params;

  

  const SOCKET_URL = 'http://172.16.77.34:8080/chat';

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(true);
  const [trigger, setTrigger] = useState("");
  const [recipientUserName, setRecipientUserName] = useState("");
  const [socket, setSocket] = useState(null);



  const handleChatMessage = (msg) => {
    console.log('New message:', msg);
    setResponse(msg?.message);
  };



  
  useEffect(() => {
    if (userName && !socket) {
      const newSocket = io(SOCKET_URL, { query: { userName } });
      setSocket(newSocket);
  
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);
  
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
    <View>
      <Text>Notification page</Text>


      <Text>Destinatario:</Text>
      <TextInput 
      value={recipientUserName}
      onChangeText={(e)=> setRecipientUserName(e)}
      placeholder="Ingresa el username destinatario aquí"
      />
      <Text>Mensaje:</Text>
      <TextInput 
      value={message}
      onChangeText={(e)=> setMessage(e)}
      placeholder="mensaje:"
      />

      <Button
        variant="text"
        title="Ingresar"
        onPress={() => sendMessage(message)}
        compact
        style={{ marginEnd: 4 }}
      />
    <Text>conectado: {userName}</Text>
    <Text>ultima respuesta: {response}</Text>
 
    </View>
  );
}

export default NotificationsPage;
