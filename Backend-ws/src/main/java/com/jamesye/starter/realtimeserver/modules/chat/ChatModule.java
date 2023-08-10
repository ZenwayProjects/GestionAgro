package com.jamesye.starter.realtimeserver.modules.chat;

import com.corundumstudio.socketio.*;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatModule {

    private static final Logger log = LoggerFactory.getLogger(ChatModule.class);

    private final SocketIONamespace namespace;
    private final Map<String, SocketIOClient> connectedUsers = new ConcurrentHashMap<>();

    @Autowired
    public ChatModule(SocketIOServer server) {
        this.namespace = server.addNamespace("/chat");
        this.namespace.addConnectListener(onConnected());
        this.namespace.addDisconnectListener(onDisconnected());
        this.namespace.addEventListener("chat", ChatMessage.class, onChatReceived());
    }

    private DataListener<ChatMessage> onChatReceived() {
        return (client, data, ackSender) -> {
            String recipientUsername = data.getRecipientUserName();

            // Obtener el cliente del destinatario
            SocketIOClient recipientClient = connectedUsers.get(recipientUsername);
            if (recipientClient != null) {
                // Enviar el mensaje solo al destinatario
                recipientClient.sendEvent("chat", data);
            } else if (recipientUsername.isEmpty()) {
                // Enviar el mensaje a todos los usuarios conectados
                for (SocketIOClient c : connectedUsers.values()) {
                    c.sendEvent("notification", data);
                }
            } else {
                log.debug("Recipient user not found: {}", recipientUsername);
            }
            log.debug("se envia: " + data);
        };
    }





    private ConnectListener onConnected() {
        return client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            log.debug("Client[{}] - Connected to chat module through '{}'", client.getSessionId().toString(), handshakeData.getUrl());

            // Recibir el nombre de usuario del cliente al conectarse
            String username = client.getHandshakeData().getSingleUrlParam("userName");
            log.debug("Client[{}] - User connected with username '{}'", client.getSessionId().toString(), username);
            log.debug("nombre: " + username);
            connectedUsers.put(username, client);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.debug("Client[{}] - Disconnected from chat module.", client.getSessionId().toString());
        };
    }

}
