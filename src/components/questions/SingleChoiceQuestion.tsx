import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionTitle } from './QuestionTitle';
import { OptionButton } from '../shared/OptionButton';
import { AudioPlayer } from '../shared/AudioPlayer';

interface SingleChoiceQuestionProps {
    question: string;
    options: Array<{
        id: string;
        text: string;
        isCorrect: boolean;
        audioUrl?: string;  // 选项的音频URL（用于听音选义）
    }>;
    onAnswer: (isCorrect: boolean) => void;
    questionAudio?: {      // 题目音频（用于听音知形）
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

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
    question,
    options,
    onAnswer,
    questionAudio,
    feedback
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = async (optionId: string) => {
        if (showResult) return;
        
        setSelectedOption(optionId);
        const isCorrect = options.find(opt => opt.id === optionId)?.isCorrect || false;
        
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

            {/* 选项列表 */}
            <div className="space-y-4">
                {options.map((option) => (
                    <div key={option.id} className="space-y-2">
                        <OptionButton
                            text={option.text}
                            isSelected={selectedOption === option.id}
                            isCorrect={option.isCorrect}
                            showResult={showResult}
                            onClick={() => handleOptionClick(option.id)}
                        />
                        {/* 选项音频（如果有） */}
                        {option.audioUrl && (
                            <AudioPlayer
                                audioUrl={option.audioUrl}
                                showPlayButton={!showResult || selectedOption === option.id}
                                buttonText="播放选项音频"
                                className="text-sm"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
