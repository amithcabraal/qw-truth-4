import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import type { Question, GameState } from './types';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import GameOver from './components/GameOver';
import Navigation from './components/Navigation';

const QUESTIONS_PER_GAME = 5;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedQuestions: [],
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
  });

  const initializeGame = () => {
    // Ensure unique questions by using Set
    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < QUESTIONS_PER_GAME) {
      uniqueIndices.add(Math.floor(Math.random() * questions.length));
    }
    
    const selectedQuestions = Array.from(uniqueIndices).map(index => questions[index]);
    
    setGameState({
      currentQuestionIndex: 0,
      selectedQuestions,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
    });
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = gameState.selectedQuestions[gameState.currentQuestionIndex];
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      score: answer === currentQuestion.correctAnswer ? prev.score + 1 : prev.score,
    }));
  };

  const handleNext = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
      isAnswered: false,
    }));
  };

  const handlePrevious = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1,
      selectedAnswer: null,
      isAnswered: false,
    }));
  };

  if (gameState.selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  const isGameOver = gameState.currentQuestionIndex >= QUESTIONS_PER_GAME;
  const currentQuestion = gameState.selectedQuestions[gameState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        {!isGameOver && currentQuestion ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-gray-600">
                Question {gameState.currentQuestionIndex + 1} of {QUESTIONS_PER_GAME}
              </p>
              <p className="text-sm text-gray-500">
                Score: {gameState.score}
              </p>
            </div>

            <QuestionCard
              question={currentQuestion}
              selectedAnswer={gameState.selectedAnswer}
              isAnswered={gameState.isAnswered}
              onAnswerSelect={handleAnswerSelect}
            />

            <Navigation
              currentIndex={gameState.currentQuestionIndex}
              totalQuestions={QUESTIONS_PER_GAME}
              isAnswered={gameState.isAnswered}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        ) : (
          <GameOver
            score={gameState.score}
            totalQuestions={QUESTIONS_PER_GAME}
            onRestart={initializeGame}
          />
        )}
      </main>
    </div>
  );
}

export default App;