import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { cn } from '../utils/cn';

const MessageInput = ({ onSendMessage, className }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim()) {
            console.log('MessageInput handleSubmit called with:', message.trim());
            onSendMessage(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'w-full max-w-4xl mx-auto relative',
                className
            )}
        >
            <form 
                onSubmit={handleSubmit}
                className="relative flex items-center rounded-lg border bg-background shadow-sm"
            >
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    rows="1"
                    className="min-h-[56px] w-full resize-none rounded-md bg-transparent px-4 py-[1.3rem] focus-visible:outline-none"
                />
                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={cn(
                        'absolute right-3 rounded-lg p-2 text-muted-foreground transition-colors',
                        message.trim() 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </motion.div>
    );
};

export default MessageInput;