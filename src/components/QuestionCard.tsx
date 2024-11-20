import React, { useMemo } from 'react';
import type { Question } from '../types';
import { ExternalLink } from 'lucide-react';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswerSelect: (answer: string) => void;
}

export default function QuestionCard({ question, selectedAnswer, isAnswered, onAnswerSelect }: Props) {
  if (!question || !question.facts) {
    return null;
  }

  // Create a mapping of display positions to actual answer keys
  const positionMapping = useMemo(() => {
    const positions = ['A', 'B', 'C', 'D'];
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    return Object.fromEntries(positions.map((pos, i) => [pos, shuffledPositions[i]]));
  }, [question]);

  // Reverse mapping to convert displayed position back to actual answer
  const reverseMapping = useMemo(() => {
    return Object.fromEntries(
      Object.entries(positionMapping).map(([display, actual]) => [actual, display])
    );
  }, [positionMapping]);

  const handleAnswerSelect = (displayPosition: string) => {
    const actualAnswer = positionMapping[displayPosition];
    onAnswerSelect(actualAnswer);
  };

  const getAnswerStatus = (displayPosition: string) => {
    if (!isAnswered) return 'unanswered';
    
    const actualAnswer = positionMapping[displayPosition];
    const displayedCorrectAnswer = reverseMapping[question.correctAnswer];
    
    if (displayPosition === displayedCorrectAnswer) return 'correct';
    if (selectedAnswer && displayPosition === reverseMapping[selectedAnswer]) return 'incorrect';
    return 'neutral';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-6">
        {['A', 'B', 'C', 'D'].map((displayPosition) => {
          const actualAnswer = positionMapping[displayPosition];
          const status = getAnswerStatus(displayPosition);
          
          return (
            <button
              key={displayPosition}
              onClick={() => !isAnswered && handleAnswerSelect(displayPosition)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg transition-all transform hover:scale-[1.01] ${
                status === 'correct'
                  ? 'bg-green-100 border-2 border-green-500'
                  : status === 'incorrect'
                  ? 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="font-semibold mr-2">{displayPosition}:</span>
              {question.facts[actualAnswer]}
            </button>
          );
        })}

        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700 mb-2">{question.explanation}</p>
            <a
              href={question.wikipediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Learn more <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}