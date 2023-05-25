import { SendOutlined } from "@ant-design/icons";
import { Button, Input, List } from "antd";
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./style.css";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const stompClientRef = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(`http://moonfamily.duckdns.org:8080/chat`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/messages", (message) => {
        const receivedMessage = JSON.parse(message.body) as string;
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const message = inputValue.trim();
      if (stompClientRef.current) {
        stompClientRef.current.send("/chat", {}, JSON.stringify(message));
      }
      setInputValue("");
    }
  };

  const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-component">
      <div className="chat-messages" ref={messageListRef}>
        <List
          dataSource={messages}
          renderItem={(item) => <List.Item className="message-item">{item}</List.Item>}
        />
      </div>
      <div className="chat-input">
        <Input
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <Button icon={<SendOutlined />} onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
