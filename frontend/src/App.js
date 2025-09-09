import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import './global.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-background antialiased">
      <div className="flex h-screen">
        <Sidebar onNewChat={handleNewChat} />
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;