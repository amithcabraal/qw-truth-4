import React from 'react';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';

interface Props {
  currentIndex: number;
  totalQuestions: number;
  isAnswered: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Navigation({ 
  currentIndex, 
  totalQuestions, 
  isAnswered,
  onNext, 
  onPrevious 
}: Props) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto mt-6">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          currentIndex === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </button>

      <button
        onClick={onNext}
        disabled={!isAnswered}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          !isAnswered
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isLastQuestion
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isLastQuestion ? (
          <>
            See Results
            <Trophy className="w-5 h-5" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}