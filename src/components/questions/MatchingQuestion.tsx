import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionTitle } from './QuestionTitle';
import { AudioPlayer } from '../shared/AudioPlayer';

interface MatchingQuestionProps {
    question: string;
    pairs: Array<{
        id: string;
        left: {
            text: string;
            audioUrl?: string;
        };
        right: {
            text: string;
            audioUrl?: string;
        };
    }>;
    onAnswer: (isCorrect: boolean) => void;
    questionAudio?: {      // 题目音频
        url: string;
        duration: number;
        autoPlay?: boolean;
    };
    feedback?: {           // 答题反馈音效
        correct: {
            url: string;
            duration: number;
        };
        incorrect: {
            url: string;
            duration: number;
        };
    };
}

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
    question,
    pairs,
    onAnswer,
    questionAudio,
    feedback
}) => {
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [selectedRight, setSelectedRight] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [showResult, setShowResult] = useState(false);

    const handleLeftClick = (id: string) => {
        if (showResult || matchedPairs.has(id)) return;
        setSelectedLeft(id);
    };

    const handleRightClick = async (id: string) => {
        if (showResult || matchedPairs.has(id)) return;
        setSelectedRight(id);

        if (selectedLeft === id) {
            const newMatched = new Set(matchedPairs);
            newMatched.add(id);
            setMatchedPairs(newMatched);
            setSelectedLeft(null);
            setSelectedRight(null);

            // 播放正确音效
            if (feedback?.correct) {
                const audio = new Audio(feedback.correct.url);
                await audio.play();
            }

            // 检查是否所有配对都完成
            if (newMatched.size === pairs.length) {
                setShowResult(true);
                onAnswer(true);
            }
        } else if (selectedLeft) {
            // 播放错误音效
            if (feedback?.incorrect) {
                const audio = new Audio(feedback.incorrect.url);
                await audio.play();
            }

            // 配对错误，重置选择
            setTimeout(() => {
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 1000);
        }
    };

    // 打乱右侧选项的顺序
    const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <QuestionTitle title={question} />

            {/* 题目音频 */}
            {questionAudio && (
                <div className="mb-6">
                    <AudioPlayer
                        audioUrl={questionAudio.url}
                        duration={questionAudio.duration}
                        autoPlay={questionAudio.autoPlay}
                        buttonText="播放题目音频"
                    />
                </div>
            )}

            <div className="flex justify-between gap-8">
                {/* 左侧选项 */}
                <div className="w-1/2 space-y-4">
                    {pairs.map(pair => (
                        <div key={`left-${pair.id}`} className="space-y-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleLeftClick(pair.id)}
                                className={`
                                    w-full p-4 rounded-lg text-left
                                    ${matchedPairs.has(pair.id)
                                        ? 'bg-green-100 border-2 border-green-500'
                                        : selectedLeft === pair.id
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-white border-2 border-gray-200'}
                                `}
                            >
                                {pair.left.text}
                            </motion.button>
                            {/* 左侧音频 */}
                            {pair.left.audioUrl && (
                                <AudioPlayer
                                    audioUrl={pair.left.audioUrl}
                                    showPlayButton={!matchedPairs.has(pair.id)}
                                    buttonText="播放音频"
                                    className="text-sm"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* 右侧选项 */}
                <div className="w-1/2 space-y-4">
                    {shuffledPairs.map(pair => (
                        <div key={`right-${pair.id}`} className="space-y-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleRightClick(pair.id)}
                                className={`
                                    w-full p-4 rounded-lg text-left
                                    ${matchedPairs.has(pair.id)
                                        ? 'bg-green-100 border-2 border-green-500'
                                        : selectedRight === pair.id
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-white border-2 border-gray-200'}
                                `}
                            >
                                {pair.right.text}
                            </motion.button>
                            {/* 右侧音频 */}
                            {pair.right.audioUrl && (
                                <AudioPlayer
                                    audioUrl={pair.right.audioUrl}
                                    showPlayButton={!matchedPairs.has(pair.id)}
                                    buttonText="播放音频"
                                    className="text-sm"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
