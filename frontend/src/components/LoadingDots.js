import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
                <motion.div
                    key={dot}
                    className="h-2 w-2 rounded-full bg-current"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.2
                    }}
                />
            ))}
        </div>
    );
};

export default LoadingDots;
