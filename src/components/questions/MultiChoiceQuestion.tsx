import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionTitle } from './QuestionTitle';
import { OptionButton } from '../shared/OptionButton';
import { AudioPlayer } from '../shared/AudioPlayer';

interface MultiChoiceQuestionProps {
    question: string;
    options: Array<{
        id: string;
        text: string;
        isCorrect: boolean;
        audioUrl?: string;  // 选项音频
    }>;
    onAnswer: (isCorrect: boolean) => void;
    minSelections?: number;
    maxSelections?: number;
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

export const MultiChoiceQuestion: React.FC<MultiChoiceQuestionProps> = ({
    question,
    options,
    onAnswer,
    minSelections = 1,
    maxSelections = options.length,
    questionAudio,
    feedback
}) => {
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = (optionId: string) => {
        if (showResult) return;

        const newSelected = new Set(selectedOptions);
        if (newSelected.has(optionId)) {
            newSelected.delete(optionId);
        } else if (newSelected.size < maxSelections) {
            newSelected.add(optionId);
        }
        setSelectedOptions(newSelected);
    };

    const handleSubmit = async () => {
        if (selectedOptions.size < minSelections) return;

        const isCorrect = Array.from(selectedOptions).every(id => 
            options.find(opt => opt.id === id)?.isCorrect
        ) && options.filter(opt => opt.isCorrect).every(opt => 
            selectedOptions.has(opt.id)
        );

        // 播放反馈音效
        if (feedback) {
            const audio = new Audio(isCorrect ? feedback.correct.url : feedback.incorrect.url);
            await audio.play();
        }

        setShowResult(true);
        onAnswer(isCorrect);
    };

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

            {/* 选择提示 */}
            <div className="text-sm text-gray-500 mb-4 text-center">
                {`请选择 ${minSelections} 到 ${maxSelections} 个正确选项`}
            </div>

            <div className="space-y-4 mb-6">
                {options.map((option) => (
                    <div key={option.id} className="space-y-2">
                        <OptionButton
                            text={option.text}
                            isSelected={selectedOptions.has(option.id)}
                            isCorrect={option.isCorrect}
                            showResult={showResult}
                            onClick={() => handleOptionClick(option.id)}
                        />
                        {/* 选项音频 */}
                        {option.audioUrl && (
                            <AudioPlayer
                                audioUrl={option.audioUrl}
                                showPlayButton={!showResult || selectedOptions.has(option.id)}
                                buttonText="播放选项音频"
                                className="text-sm"
                            />
                        )}
                    </div>
                ))}
            </div>

            {!showResult && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={selectedOptions.size < minSelections}
                    className={`
                        w-full py-3 rounded-lg font-medium
                        ${selectedOptions.size >= minSelections
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    `}
                >
                    确认答案
                </motion.button>
            )}
        </div>
    );
};
