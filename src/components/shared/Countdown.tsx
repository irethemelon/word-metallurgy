import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
    duration: number;           // 初始时间（秒）
    isAccelerated: boolean;    // 是否加速
    accelerationRate?: number; // 加速倍率
    warningThreshold?: number; // 警告阈值（秒）
    paused?: boolean;         // 是否暂停
    showSeconds?: boolean;    // 是否显示秒数
    className?: string;
    onTimeUp?: () => void;    // 时间到回调
    onWarning?: () => void;   // 进入警告状态回调
}

export const Countdown: React.FC<CountdownProps> = ({
    duration,
    isAccelerated,
    accelerationRate = 2,
    warningThreshold = 10,
    paused = false,
    showSeconds = true,
    className = '',
    onTimeUp,
    onWarning
}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isWarning, setIsWarning] = useState(false);
    const lastTickTime = useRef<number>(Date.now());
    const animationFrameId = useRef<number>();

    // 计算实际的时间减少速率
    const getTimeDecrementRate = useCallback(() => {
        const baseRate = 1000; // 1秒
        return isAccelerated ? baseRate / accelerationRate : baseRate;
    }, [isAccelerated, accelerationRate]);

    // 更新倒计时
    const updateCountdown = useCallback(() => {
        const now = Date.now();
        const delta = now - lastTickTime.current;
        
        if (delta >= getTimeDecrementRate()) {
            setTimeLeft(prevTime => {
                const newTime = Math.max(0, prevTime - 1);
                
                // 检查是否需要触发警告
                if (newTime <= warningThreshold && !isWarning) {
                    setIsWarning(true);
                    onWarning?.();
                }

                // 检查是否时间到
                if (newTime === 0) {
                    onTimeUp?.();
                }

                return newTime;
            });
            lastTickTime.current = now;
        }

        animationFrameId.current = requestAnimationFrame(updateCountdown);
    }, [getTimeDecrementRate, warningThreshold, isWarning, onWarning, onTimeUp]);

    // 启动/暂停倒计时
    useEffect(() => {
        if (!paused) {
            animationFrameId.current = requestAnimationFrame(updateCountdown);
        }
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [paused, updateCountdown]);

    // 重置倒计时
    useEffect(() => {
        setTimeLeft(duration);
        setIsWarning(false);
    }, [duration]);

    // 格式化时间显示
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return showSeconds 
            ? `${mins}:${secs.toString().padStart(2, '0')}`
            : `${Math.ceil(seconds / 60)}分钟`;
    };

    // 计算进度条颜色
    const getProgressColor = () => {
        if (isWarning) {
            return isAccelerated ? 'bg-red-600' : 'bg-yellow-500';
        }
        return isAccelerated ? 'bg-orange-500' : 'bg-blue-500';
    };

    // 计算进度百分比
    const progress = (timeLeft / duration) * 100;

    return (
        <div className={`relative w-full ${className}`}>
            {/* 进度条背景 */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* 进度条 */}
                <motion.div
                    className={`h-full ${getProgressColor()} transition-colors duration-300`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* 时间显示 */}
            <AnimatePresence>
                {showSeconds && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`
                            absolute -top-6 left-1/2 transform -translate-x-1/2
                            text-sm font-medium
                            ${isWarning ? 'text-red-600' : 'text-gray-600'}
                        `}
                    >
                        {formatTime(timeLeft)}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 加速指示器 */}
            {isAccelerated && (
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -right-2 -top-2 w-3 h-3 rounded-full bg-red-500"
                />
            )}
        </div>
    );
};
