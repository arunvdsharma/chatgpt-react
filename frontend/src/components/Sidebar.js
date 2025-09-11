import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { fetchChats } from '../utils/api';

const Sidebar = ({ onNewChat, selectedChatId, setSelectedChatId }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        loadChats();
    }, []);

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
                            <li key={chat._id}>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedChatId === chat._id ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    onClick={() => setSelectedChatId(chat._id)}
                                >
                                    {chat.title || 'New Chat'}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="border-t p-4">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm font-medium">Chintan-AI</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
