import React from 'react';
import { motion } from 'framer-motion';

interface OptionButtonProps {
    text: string;
    isSelected?: boolean;
    isCorrect?: boolean;
    showResult?: boolean;
    onClick: () => void;
    className?: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
    text,
    isSelected = false,
    isCorrect,
    showResult = false,
    onClick,
    className = ''
}) => {
    // 根据状态决定按钮的背景色
    const getBackgroundColor = () => {
        if (!showResult) {
            return isSelected ? 'bg-blue-100' : 'bg-white';
        }
        if (isCorrect) {
            return 'bg-green-100';
        }
        return isSelected ? 'bg-red-100' : 'bg-white';
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                w-full px-6 py-4 rounded-lg
                ${getBackgroundColor()}
                border-2 ${isSelected ? 'border-blue-500' : 'border-gray-200'}
                text-gray-800 font-medium text-lg
                transition-colors duration-200
                hover:border-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-300
                ${className}
            `}
        >
            {text}
        </motion.button>
    );
};
