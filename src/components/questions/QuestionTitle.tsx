import React from 'react';
import { motion } from 'framer-motion';

interface QuestionTitleProps {
    title: string;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({ title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-700 text-center mb-8 font-medium"
        >
            {title}
        </motion.div>
    );
};
