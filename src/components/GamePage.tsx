import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordCard } from './WordCard';
import { QuestionModal } from './QuestionModal';
import { GameState, WordLearningState } from '../types/game';
import { gameConfig } from '../data/sample-data';

interface GamePageProps {
    gameState: GameState;
    onWordSelect: (wordId: string) => void;
    onAnswerSubmit: (wordId: string, questionType: number, isCorrect: boolean) => void;
}

export const GamePage: React.FC<GamePageProps> = ({
    gameState,
    onWordSelect,
    onAnswerSubmit,
}) => {
    // 根据 wordId 找到对应的单词数据
    const getCurrentWord = (wordId: string) => {
        // 直接通过单词内容查找
        const word = gameState.words.find(word => word.word === wordId);
        console.log('Finding word:', wordId, 'Found:', word); // 调试日志
        return word;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* 单词网格 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                    {gameState.activeWords.map((wordId) => {
                        const word = getCurrentWord(wordId);
                        console.log('Rendering word card:', wordId, word); // 调试日志
                        return (
                            <WordCard
                                key={wordId}
                                word={wordId}
                                wordState={gameState.wordStates[wordId]}
                                onClick={() => onWordSelect(wordId)}
                                config={gameConfig}
                            />
                        );
                    })}
                </div>

                {/* 题目弹窗 */}
                <AnimatePresence>
                    {gameState.isQuestionModalOpen && gameState.currentWord && (
                        <QuestionModal
                            wordId={gameState.currentWord}
                            wordState={gameState.wordStates[gameState.currentWord]}
                            onAnswerSubmit={onAnswerSubmit}
                            config={gameConfig}
                            word={getCurrentWord(gameState.currentWord)!}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
