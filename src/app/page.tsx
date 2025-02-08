"use client";

import { useState } from 'react';
import { GamePage } from '@/components/GamePage';
import { initialGameState } from '@/data/sample-data';
import { GameState } from '@/types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleWordSelect = (wordId: string) => {
    console.log('Selected word:', wordId); // 调试日志
    setGameState(prev => ({
      ...prev,
      currentWord: wordId,
      isQuestionModalOpen: true
    }));
  };

  const handleAnswerSubmit = (wordId: string, questionType: number, isCorrect: boolean) => {
    console.log('Answer submitted:', { wordId, questionType, isCorrect }); // 调试日志
    
    if (isCorrect) {
      // 播放正确音效
      const audio = new Audio(gameState.soundEffects.correct.url);
      audio.play();
      
      // 更新进度
      setGameState(prev => ({
        ...prev,
        wordStates: {
          ...prev.wordStates,
          [wordId]: {
            ...prev.wordStates[wordId],
            currentStage: questionType
          }
        },
        isQuestionModalOpen: false
      }));
    } else {
      // 播放错误音效
      const audio = new Audio(gameState.soundEffects.incorrect.url);
      audio.play();
      
      // 加速倒计时
      setGameState(prev => ({
        ...prev,
        wordStates: {
          ...prev.wordStates,
          [wordId]: {
            ...prev.wordStates[wordId],
            timerState: {
              ...prev.wordStates[wordId].timerState,
              isAccelerated: true
            }
          }
        }
      }));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">单词冶金</h1>
        <GamePage
          gameState={gameState}
          onWordSelect={handleWordSelect}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </div>
    </main>
  );
}