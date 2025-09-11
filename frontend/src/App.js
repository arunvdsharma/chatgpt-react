
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { fetchChats, fetchMessages, createChat } from './utils/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [hasSentMessage, setHasSentMessage] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      const chats = await fetchChats();
      if (chats.length > 0) {
        setSelectedChatId(chats[0]._id);
      } else {
        const chat = await createChat();
        setSelectedChatId(chat._id);
      }
    };
    if (!selectedChatId) {
      initChat();
    }
  }, [selectedChatId]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedChatId) {
        try {
          const msgs = await fetchMessages(selectedChatId);
          // Map backend format to frontend format
          const mappedMsgs = msgs.map(msg => ({
            sender: msg.role === 'user' ? 'Request' : 'Response',
            text: msg.content,
            timestamp: msg.timestamp
          }));
          setMessages(mappedMsgs);
        } catch (err) {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    };
    loadMessages();
  }, [selectedChatId, hasSentMessage]);

  const handleNewChat = async () => {
    setMessages([]);
    try {
      const chat = await createChat();
      setSelectedChatId(chat._id);
      // Immediately fetch messages for the new chat
      const msgs = await fetchMessages(chat._id);
      const mappedMsgs = msgs.map(msg => ({
        sender: msg.role === 'user' ? 'Request' : 'Response',
        text: msg.content,
        timestamp: msg.timestamp
      }));
      setMessages(mappedMsgs);
    } catch (err) {
      setSelectedChatId(null);
      setMessages([]);
    }
  };

  return (
    <div className="min-h-screen bg-background antialiased">
      <div className="flex h-screen">
        <Sidebar
          onNewChat={handleNewChat}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
        <div className="flex-1">
          {/* Pass chatId and messages as props to ChatWindow */}
          <ChatWindow
            chatId={selectedChatId}
            messages={messages}
            setMessages={setMessages}
            hasSentMessage={hasSentMessage}
            setHasSentMessage={setHasSentMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;