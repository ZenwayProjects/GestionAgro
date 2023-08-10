package com.jamesye.starter.realtimeserver.modules.chat;

public class ChatMessage {

    private String userName;
    private String recipientUserName;
    private String message;

    public ChatMessage() {
    }

    public ChatMessage(String userName, String message , String recipientUserName) {
        super();
        this.userName = userName;
        this.message = message;
        this.recipientUserName = recipientUserName;
    }

    public String getUserName() {
        return userName;
    }

    public String getRecipientUserName() {
        return recipientUserName;
    }

    public void setRecipientUserName(String recipientUserName) {
        this.recipientUserName = recipientUserName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                ", recipientUserName='" + recipientUserName + '\'' +
                '}';
    }
}
