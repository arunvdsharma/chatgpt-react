import React from 'react';
import { motion } from 'framer-motion';
import { APP_NAME } from '../constants';

const WelcomeMessage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 max-w-2xl mx-auto px-4"
        >
            <motion.h1 
                className="text-3xl font-bold mb-2 text-primary"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Welcome to {APP_NAME}!
            </motion.h1>
            <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                How can I help you today?
            </motion.p>
        </motion.div>
    );
};

export default WelcomeMessage;
