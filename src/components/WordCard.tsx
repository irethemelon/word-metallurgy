import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WordLearningState } from '../types/game';

interface WordCardProps {
    word: string;
    wordState: WordLearningState;
    onClick: () => void;
    config: any;
}

const STAGE_COLORS = [
    '#FFFFFF', // 初始状态
    '#FFE4E1', // 看形知义
    '#FFE4C4', // 看义知形
    '#FFF8DC', // 听音知形
    '#F0FFF0', // 多选题
    '#F0FFFF', // 配对题
    '#F0F8FF', // 填空题
    '#F5F0FF'  // 听音配对
];

export const WordCard: React.FC<WordCardProps> = ({
    word,
    wordState,
    onClick,
    config
}) => {
    const currentColor = STAGE_COLORS[wordState.currentStage];
    const [timeProgress, setTimeProgress] = useState((wordState.timerState.timeRemaining / 300) * 100);
    const [startTime, setStartTime] = useState(Date.now());
    const [isCompleted, setIsCompleted] = useState(false);
    const [isTimedOut, setIsTimedOut] = useState(false);

    // 检查是否完成所有题目
    useEffect(() => {
        if (wordState.currentStage === 7) { // 第七题的索引是7
            setIsCompleted(true);
            setTimeProgress(100);
            setIsTimedOut(false); // 重置超时状态
        } else {
            setIsCompleted(false);
        }
    }, [wordState.currentStage]);

    // 重置计时器
    useEffect(() => {
        if (!isCompleted) {
            setStartTime(Date.now());
            setTimeProgress(100);
            setIsTimedOut(false); // 重置超时状态
        }
    }, [wordState.currentStage, isCompleted]);

    // 倒计时效果
    useEffect(() => {
        if (isCompleted) return; // 如果完成所有题目，不启动倒计时

        const duration = 60000; // 60秒

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            
            if (remaining <= 0) {
                clearInterval(timer);
                setTimeProgress(0);
                setIsTimedOut(true); // 设置超时状态
            } else {
                setTimeProgress(remaining);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [startTime, isCompleted]);

    return (
        <motion.div
            className={`relative w-64 h-32 rounded-lg shadow-lg transition-all ${
                isTimedOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'
            }`}
            style={{ backgroundColor: currentColor }}
            onClick={() => !isTimedOut && onClick()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isTimedOut ? 0.5 : 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* 倒计时进度条 */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-t-lg overflow-hidden">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '100%' }}
                    animate={{ 
                        width: `${timeProgress}%`,
                        backgroundColor: isCompleted ? '#22C55E' : timeProgress < 20 ? '#EF4444' : '#3B82F6'
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* 单词显示 */}
            <div className="h-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{word}</span>
                <div className="text-sm text-gray-600">
                    阶段 {wordState.currentStage}/7
                </div>
            </div>

            {/* 加速状态指示器 */}
            {wordState.timerState.isAccelerated && (
                <div className="absolute bottom-2 right-2">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-4 h-4 bg-red-500 rounded-full"
                    />
                </div>
            )}
        </motion.div>
    );
};
