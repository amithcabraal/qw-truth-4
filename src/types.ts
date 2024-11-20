export interface Fact {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Question {
  questionNumber: number;
  facts: Fact;
  correctAnswer: string;
  explanation: string;
  wikipediaLink: string;
}

export interface GameState {
  currentQuestionIndex: number;
  selectedQuestions: Question[];
  score: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
}