import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudioPreload } from '../../hooks/useAudioPreload';

interface AudioPlayerProps {
    audioUrl: string;
    duration?: number;
    autoPlay?: boolean;
    showPlayButton?: boolean;
    buttonText?: string;
    className?: string;
    onPlayStart?: () => void;
    onPlayEnd?: () => void;
    onError?: (error: Error) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    audioUrl,
    duration = 1.5,
    autoPlay = false,
    showPlayButton = true,
    buttonText = '播放音频',
    className = '',
    onPlayStart,
    onPlayEnd,
    onError
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const progressTimerRef = useRef<number | null>(null);
    const { preloadAudio, playAudio } = useAudioPreload();

    useEffect(() => {
        // 预加载音频
        preloadAudio({ url: audioUrl, duration })
            .then(() => setIsLoaded(true))
            .catch(error => {
                console.error('Failed to preload audio:', error);
                onError?.(error);
            });

        return () => {
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
        };
    }, [audioUrl, duration, preloadAudio, onError]);

    useEffect(() => {
        // 自动播放
        if (autoPlay && isLoaded) {
            handlePlay();
        }
    }, [autoPlay, isLoaded]);

    const handlePlay = async () => {
        if (isPlaying) return;

        try {
            setIsPlaying(true);
            onPlayStart?.();

            // 重置进度
            setProgress(0);
            
            // 播放音频
            await playAudio({ url: audioUrl, duration });

            // 更新进度条
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
            
            const startTime = Date.now();
            progressTimerRef.current = window.setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                const newProgress = Math.min((elapsed / duration) * 100, 100);
                setProgress(newProgress);

                if (newProgress >= 100) {
                    if (progressTimerRef.current) {
                        clearInterval(progressTimerRef.current);
                    }
                    setIsPlaying(false);
                    setProgress(0);
                    onPlayEnd?.();
                }
            }, 16); // 约60fps的更新频率
        } catch (error) {
            console.error('Failed to play audio:', error);
            setIsPlaying(false);
            onError?.(error as Error);
        }
    };

    if (!showPlayButton) {
        return null;
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlay}
            disabled={isPlaying || !isLoaded}
            className={`
                relative w-full py-3 px-4 rounded-lg
                ${isPlaying ? 'bg-blue-100' : isLoaded ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-100 opacity-50 cursor-not-allowed'}
                text-gray-700 font-medium
                flex items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-blue-300
                ${className}
            `}
        >
            {/* 音频图标 */}
            <svg 
                className={`w-5 h-5 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                {isPlaying ? (
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.343 9.657L11 14.314l-.657.657a4 4 0 01-5.657-5.657z" 
                    />
                ) : (
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.343 9.657L11 14.314l-.657.657a4 4 0 01-5.657-5.657z" 
                    />
                )}
            </svg>

            {/* 按钮文本 */}
            <span>{!isLoaded ? '加载中...' : buttonText}</span>

            {/* 进度条 */}
            {isPlaying && (
                <div className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-b-lg transition-all duration-100"
                     style={{ width: `${progress}%` }} />
            )}
        </motion.button>
    );
};
