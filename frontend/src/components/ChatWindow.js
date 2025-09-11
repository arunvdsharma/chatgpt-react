import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WelcomeMessage from './WelcomeMessage';
import LoadingDots from './LoadingDots';
import { sendMessage, fetchMessages } from '../utils/api';
import { cn } from '../utils/cn';


const ChatWindow = ({ chatId, messages, setMessages, hasSentMessage, setHasSentMessage }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const messageListRef = useRef(null);

    const scrollToBottom = () => {
        const messageList = messageListRef.current;
        if (messageList) {
            const isScrolledToBottom = 
                messageList.scrollHeight - messageList.clientHeight <= messageList.scrollTop + 150;
            
            if (isScrolledToBottom) {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        // Always scroll to bottom for the first message
        if (messages.length === 1) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);

    const handleSendMessage = async (text) => {
        if (!chatId) {
            setError('No chat selected.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log('Calling sendMessage API with:', chatId, text);
            await sendMessage(chatId, text);
            console.log('sendMessage API call finished');
            // After sending, fetch all messages for the chat using API utility
            console.log('Calling fetchMessages API with:', chatId);
            const msgs = await fetchMessages(chatId);
            console.log('Fetched messages from backend:', msgs);
            const mappedMsgs = msgs.map(msg => ({
                sender: msg.role === 'user' ? 'Request' : 'Response',
                text: msg.content,
                timestamp: msg.timestamp
            }));
            console.log('Mapped messages for UI:', mappedMsgs);
            setMessages(mappedMsgs);
            setHasSentMessage(true);
        } catch (err) {
            console.error('ChatWindow handleSendMessage error:', err);
            setError('Failed to get response from the server.');
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    // Debug log to check messages prop and setMessages
    console.log('ChatWindow messages prop:', messages);
    console.log('ChatWindow setMessages:', typeof setMessages);
    return (
        <div className="relative flex h-full flex-col">
            <main className="flex-1 flex flex-col overflow-hidden">
                <AnimatePresence mode="wait">
                    {(messages.length === 0 && !hasSentMessage) ? (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center"
                        >
                            <WelcomeMessage />
                            <div className="w-full max-w-4xl px-4 absolute bottom-8">
                                <MessageInput 
                                    onSendMessage={handleSendMessage}
                                    className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b">
                                <div className="h-14 flex items-center px-4">
                                    <h2 className="text-lg font-semibold">Chintan-AI</h2>
                                </div>
                            </header>
                            
                            <div className="flex-1 overflow-hidden relative">
                                <MessageList messages={messages} />
                                <AnimatePresence>
                                    {loading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-background/80 backdrop-blur"
                                        >
                                            <div className="max-w-4xl mx-auto">
                                                <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-muted-foreground">
                                                    Chintan-AI is thinking
                                                    <LoadingDots />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>
                            
                            <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-t p-4">
                                <MessageInput onSendMessage={handleSendMessage} />
                            </div>
                            
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-20 left-0 right-0 px-4"
                                >
                                    <div className="max-w-4xl mx-auto">
                                        <div className="bg-destructive/15 text-destructive text-sm rounded-lg px-4 py-2">
                                            {error}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ChatWindow;