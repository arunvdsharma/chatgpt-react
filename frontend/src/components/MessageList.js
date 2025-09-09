import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Message = ({ message, index }) => {
    const isRequest = message.sender === 'Request';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                'flex w-full mb-4',
                isRequest ? 'justify-end' : 'justify-start'
            )}
        >
            <div className={cn(
                'px-4 py-3 rounded-2xl max-w-[85%]',
                'bg-muted text-foreground',
                isRequest ? 'rounded-tr-none' : 'rounded-tl-none'
            )}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                </div>
            </div>
        </motion.div>
    );
};

const MessageList = ({ messages = [] }) => {
    return (
        <div className="flex-1 overflow-y-auto px-4">
            <div className="max-w-4xl mx-auto py-6">
                <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                        <Message key={index} message={message} index={index} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MessageList;
