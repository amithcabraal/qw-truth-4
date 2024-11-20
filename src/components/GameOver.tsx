import React from 'react';
import { Trophy } from 'lucide-react';

interface Props {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function GameOver({ score, totalQuestions, onRestart }: Props) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="text-center space-y-6">
      <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
      <h2 className="text-3xl font-bold">Game Over!</h2>
      <p className="text-xl">
        You scored {score} out of {totalQuestions} ({percentage.toFixed(1)}%)
      </p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}