import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OptionButton } from '../shared/OptionButton';
import { AudioPlayer } from '../shared/AudioPlayer';

interface FillInBlankQuestionProps {
    sentence: string;      // 包含 _____ 的句子
    options: Array<{
        id: string;
        text: string;
        isCorrect: boolean;
        audioUrl?: string;  // 选项音频
    }>;
    onAnswer: (isCorrect: boolean) => void;
    sentenceAudio?: {      // 句子音频
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

export const FillInBlankQuestion: React.FC<FillInBlankQuestionProps> = ({
    sentence,
    options,
    onAnswer,
    sentenceAudio,
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

    // 将选中的答案插入到句子中
    const getDisplaySentence = () => {
        if (!selectedOption) {
            return sentence;
        }
        const selectedText = options.find(opt => opt.id === selectedOption)?.text || '_____';
        const isCorrect = options.find(opt => opt.id === selectedOption)?.isCorrect || false;
        
        return sentence.replace('_____', 
            showResult 
                ? `<span class="${isCorrect ? 'text-green-600' : 'text-red-600'} font-bold">${selectedText}</span>`
                : `<span class="text-blue-600 font-bold">${selectedText}</span>`
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* 句子显示区域 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-gray-700 text-center mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getDisplaySentence() }}
            />

            {/* 句子音频 */}
            {sentenceAudio && (
                <div className="mb-6">
                    <AudioPlayer
                        audioUrl={sentenceAudio.url}
                        duration={sentenceAudio.duration}
                        autoPlay={sentenceAudio.autoPlay}
                        buttonText="播放句子音频"
                    />
                </div>
            )}

            {/* 分隔线 */}
            <div className="w-full h-px bg-gray-200 my-6" />

            {/* 选项列表 */}
            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => (
                    <div key={option.id} className="space-y-2">
                        <OptionButton
                            text={option.text}
                            isSelected={selectedOption === option.id}
                            isCorrect={option.isCorrect}
                            showResult={showResult}
                            onClick={() => handleOptionClick(option.id)}
                            className="text-center"
                        />
                        {/* 选项音频 */}
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

            {/* 提示信息 */}
            {!selectedOption && (
                <div className="text-center text-gray-500 mt-4">
                    请选择正确的单词填入横线处
                </div>
            )}
        </div>
    );
};
