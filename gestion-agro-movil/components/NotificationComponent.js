import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const NotificationComponent = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: '¡Bienvenido al chat de notificaciones!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Sistema',
      },
    },
  ]);

  useEffect(() => {
    const socket = io('http://172.16.77.34:8080/ws-message'); // Reemplaza con la URL de tu servidor
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Recibe mensajes del servidor y agrégales al estado
    socket.on('new_message', (message) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
    });

    // Limpia la conexión cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={() => {}} // Remueve esta línea o implementa la lógica para enviar mensajes
        user={{ _id: 1 }} // Reemplaza con el ID del usuario o el objeto de usuario si aplica
      />
    </View>
  );
};

export default NotificationComponent;