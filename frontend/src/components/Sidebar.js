import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { fetchChats, deleteChat } from '../utils/api';
import { APP_NAME } from '../constants';

const Sidebar = ({ onNewChat, selectedChatId, setSelectedChatId }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadChats = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchChats();
            setChats(data);
        } catch (err) {
            setError('Failed to load chats');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadChats();
    }, []);

    const handleDeleteChat = async (chatId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Delete this chat?')) {
            await deleteChat(chatId);
            if (selectedChatId === chatId) setSelectedChatId(null);
            loadChats();
        }
    };

    return (
        <div className="w-[300px] h-full bg-muted/50 border-r flex flex-col">
            <div className="p-4">
                <button 
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span>New chat</span>
                </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
                {loading ? (
                    <div className="text-muted">Loading chats...</div>
                ) : error ? (
                    <div className="text-danger">{error}</div>
                ) : (
                    <ul className="space-y-2">
                        {chats.map(chat => (
                            <li key={chat._id} className="relative group">
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedChatId === chat._id ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    onClick={() => setSelectedChatId(chat._id)}
                                    onContextMenu={(e) => handleDeleteChat(chat._id, e)}
                                >
                                    {chat.title || 'New Chat'}
                                </button>
                                <button
                                    className="absolute right-2 top-2 hidden group-hover:inline text-xs text-danger bg-transparent border-none cursor-pointer"
                                    title="Delete chat"
                                    onClick={(e) => handleDeleteChat(chat._id, e)}
                                >🗑️</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="border-t p-4">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm font-medium">{APP_NAME}</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
