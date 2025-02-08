import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordLearningState, WordData, BaseQuestion } from '../types/game';

interface QuestionModalProps {
    wordId: string;
    wordState: WordLearningState;
    onAnswerSubmit: (wordId: string, questionType: number, isCorrect: boolean) => void;
    config: any;
    word: WordData;
}

const STAGE_NAMES = [
    '看形知义',
    '看义知形',
    '听音知形',
    '知多义',
    '知搭配',
    '知变形',
    '知辨析'
];

// 正确答案音效
const SUCCESS_SOUND = new Audio('/audio/correct.mp3');

// 错误音效
const ERROR_SOUND = new Audio('/audio/error.mp3');

export const QuestionModal: React.FC<QuestionModalProps> = ({
    wordId,
    wordState,
    onAnswerSubmit,
    config,
    word
}) => {
    // 错误检查
    if (!word) {
        console.error('Word data is missing!');
        return null;
    }

    // 获取当前题目
    const currentQuestion = word.questions?.questions?.find(
        q => q.type === wordState.currentStage + 1
    );

    if (!currentQuestion) {
        console.error('Question not found for stage:', wordState.currentStage + 1);
        return null;
    }

    // 多选题的选中状态
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    // 配对题的状态
    const [selectedPair, setSelectedPair] = useState<{english?: string, chinese?: string}>({});
    const [completedPairs, setCompletedPairs] = useState<Set<string>>(new Set());
    const [shuffledPairs, setShuffledPairs] = useState<{english: any[], chinese: any[]}>({english: [], chinese: []});
    // 普通选项的随机排序状态
    const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

    // 初始化配对题的数据
    useEffect(() => {
        if ((wordState.currentStage === 4 || wordState.currentStage === 6) && currentQuestion?.isPairMatching && currentQuestion.pairs) {
            const pairs = currentQuestion.pairs;
            const shuffledEnglish = [...pairs].sort(() => Math.random() - 0.5);
            const shuffledChinese = [...pairs].sort(() => Math.random() - 0.5);
            setShuffledPairs({english: shuffledEnglish, chinese: shuffledChinese});
            setSelectedPair({});
            setCompletedPairs(new Set());
        }
    }, [wordState.currentStage, currentQuestion]);

    // 初始化普通选项的随机排序
    useEffect(() => {
        if (currentQuestion && !currentQuestion.isPairMatching && currentQuestion.options) {
            const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
            setShuffledOptions(shuffled);
            setSelectedOptions([]);
        }
    }, [wordState.currentStage, currentQuestion]);

    // 播放音频的函数
    const playAudio = useCallback((url?: string) => {
        const audioUrl = url || currentQuestion?.audioUrl;
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
        }
    }, [currentQuestion]);

    // 播放正确音效并延迟提交
    const playSuccessAndSubmit = useCallback((wordId: string, stage: number, isCorrect: boolean) => {
        SUCCESS_SOUND.play()
            .then(() => {
                // 等待500ms后关闭弹窗
                setTimeout(() => {
                    onAnswerSubmit(wordId, stage, isCorrect);
                }, 500);
            })
            .catch(error => {
                console.error('Failed to play success sound:', error);
                // 如果播放失败，仍然继续提交答案
                onAnswerSubmit(wordId, stage, isCorrect);
            });
    }, [SUCCESS_SOUND]);

    // 播放错误音效
    const playErrorSound = useCallback(() => {
        ERROR_SOUND.play().catch(error => {
            console.error('Failed to play error sound:', error);
        });
    }, [ERROR_SOUND]);

    // 自动播放音频（第三题）
    useEffect(() => {
        if (wordState.currentStage === 2 && currentQuestion?.audioUrl) {
            playAudio(currentQuestion.audioUrl);
        }
    }, [wordState.currentStage, currentQuestion, playAudio]);

    const handleOptionClick = (optionId: string, isCorrect: boolean) => {
        if (currentQuestion?.isMultiSelect) {
            // 多选题处理
            setSelectedOptions(prev => {
                if (prev.includes(optionId)) {
                    return prev.filter(id => id !== optionId);
                } else {
                    return [...prev, optionId];
                }
            });
        } else {
            // 单选题处理
            if (wordState.currentStage === 1 && isCorrect) {
                playAudio();
            }
            if (isCorrect) {
                playSuccessAndSubmit(wordId, wordState.currentStage + 1, isCorrect);
            } else {
                playErrorSound();
            }
        }
    };

    // 处理配对题的点击
    const handlePairClick = (text: string, type: 'english' | 'chinese') => {
        if (currentQuestion?.isPairMatching && currentQuestion.pairs) {
            setSelectedPair(prev => {
                const newPair = { ...prev };
                newPair[type] = text;

                // 如果两个都选中了
                if (newPair.english && newPair.chinese) {
                    // 找到对应的配对
                    const matchingPair = currentQuestion.pairs.find(
                        p => p.english === newPair.english && p.chinese === newPair.chinese
                    );

                    if (matchingPair) {
                        // 配对成功
                        if (matchingPair.audioUrl) {
                            playAudio(matchingPair.audioUrl);
                        }
                        setCompletedPairs(prev => {
                            const newSet = new Set(prev);
                            newSet.add(matchingPair.id);
                            
                            // 如果完成了所有配对
                            if (newSet.size === currentQuestion.pairs.length) {
                                setTimeout(() => {
                                    playSuccessAndSubmit(wordId, wordState.currentStage + 1, true);
                                }, 1000);
                            }
                            
                            return newSet;
                        });
                    } else {
                        // 配对失败
                        playErrorSound();
                    }

                    // 重置选择
                    return {};
                }

                return newPair;
            });
        }
    };

    const handleMultiSelectSubmit = () => {
        if (!currentQuestion) return;

        // 获取所有正确选项的ID
        const correctOptionIds = currentQuestion.options
            .filter(option => option.isCorrect)
            .map(option => option.id);

        // 检查选中的选项是否与正确选项完全匹配（不考虑顺序）
        const isCorrect = 
            correctOptionIds.length === selectedOptions.length &&
            correctOptionIds.every(id => selectedOptions.includes(id));

        if (isCorrect) {
            playSuccessAndSubmit(wordId, wordState.currentStage + 1, isCorrect);
        } else {
            playErrorSound();
            setSelectedOptions([]);
        }
    };

    // 渲染题目内容
    const renderQuestionContent = () => {
        switch (wordState.currentStage) {
            case 0: // 看形知义
            case 3: // 知多义
                return <div className="text-3xl font-bold text-center mb-6">{word.word}</div>;
            case 1: // 看义知形
            case 5: // 知变形
                return <div className="text-xl text-center mb-6 leading-relaxed">
                    {currentQuestion.questionText}
                </div>;
            case 2: // 听音知形
                return (
                    <div className="text-center mb-6">
                        <button 
                            onClick={() => currentQuestion?.audioUrl && playAudio(currentQuestion.audioUrl)}
                            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        </button>
                    </div>
                );
            case 4: // 知搭配
            case 6: // 知辨析
                return <div className="text-xl text-center mb-6 leading-relaxed">
                    {currentQuestion.question}
                </div>;
            default:
                return null;
        }
    };

    // 渲染选项
    const renderOptions = () => {
        if (!currentQuestion) return null;

        if (currentQuestion.isPairMatching) {
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {shuffledPairs.english.map((pair: any) => (
                            <div
                                key={pair.id}
                                className={`p-4 mb-4 rounded-lg cursor-pointer transition-colors ${
                                    selectedPair.english === pair.english
                                        ? 'bg-blue-500 text-white'
                                        : completedPairs.has(pair.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                onClick={() => handlePairClick(pair.english, 'english')}
                            >
                                {pair.english}
                            </div>
                        ))}
                    </div>
                    <div>
                        {shuffledPairs.chinese.map((pair: any) => (
                            <div
                                key={pair.id}
                                className={`p-4 mb-4 rounded-lg cursor-pointer transition-colors ${
                                    selectedPair.chinese === pair.chinese
                                        ? 'bg-blue-500 text-white'
                                        : completedPairs.has(pair.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                onClick={() => handlePairClick(pair.chinese, 'chinese')}
                            >
                                {pair.chinese}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {shuffledOptions.map(option => (
                    <div
                        key={option.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            currentQuestion.isMultiSelect
                                ? selectedOptions.includes(option.id)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleOptionClick(option.id, option.isCorrect)}
                    >
                        {option.text}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* 标题区域 */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">第{wordState.currentStage + 1}题：{STAGE_NAMES[wordState.currentStage]}</h2>
                    {renderQuestionContent()}
                </div>

                {/* 选项区域 */}
                <div className="mb-8">
                    {renderOptions()}
                </div>

                {/* 提交按钮（仅多选题显示） */}
                {currentQuestion?.isMultiSelect && (
                    <div className="text-center">
                        <button
                            onClick={handleMultiSelectSubmit}
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            提交答案
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
