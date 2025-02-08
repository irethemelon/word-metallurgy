import React from 'react';
import { motion } from 'framer-motion';

interface WelcomePageProps {
    onStartGame: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartGame }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-gray-800 mb-8"
            >
                欢迎来到单词炼金工坊
            </motion.div>
            
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={onStartGame}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold
                         shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 
                         focus:ring-blue-400 focus:ring-opacity-50"
            >
                开始游戏
            </motion.button>
        </div>
    );
};
