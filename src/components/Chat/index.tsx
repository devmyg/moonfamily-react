import { SendOutlined } from "@ant-design/icons";
import { Button, Input, List, Avatar } from "antd";
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./style.css";
import { useCookies } from "react-cookie";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [cookies] = useCookies();
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const stompClientRef = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(`http://moonfamily.duckdns.org:8080/chat`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;
    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/messages", (message) => {
        const receivedMessage = JSON.parse(message.body);
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
      const token = cookies.token;
      const header = { Authorization: `${token}` };

      if (stompClientRef.current) {
        stompClientRef.current.send("/chat", header, JSON.stringify(message));
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

  const renderMessage = (message: any, index: number) => {
    const { userId, userName, userProfile, content } = message.data;
    const avatar = userProfile ? (
      <Avatar src={`${process.env.REACT_APP_API_URL}/${userProfile}`} alt={userName} />
    ) : (
      <Avatar
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        alt={userName}
      />
    );
    const messageText = `${userName}: ${content.replace(/"/g, "")}`;
    return (
      <List.Item key={index} className="message-item">
        <List.Item.Meta avatar={avatar} title={messageText} />
      </List.Item>
    );
  };

  return (
    <div className="chat-component">
      <div className="chat-messages" ref={messageListRef}>
        <List dataSource={messages} renderItem={renderMessage} />
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
