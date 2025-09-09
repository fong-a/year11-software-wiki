import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface QuizQuestion {
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ScenarioQuizProps {
  questions: QuizQuestion[];
  title: string;
}

export const ScenarioQuiz: React.FC<ScenarioQuizProps> = ({ questions, title }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{title} - Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold mb-4 text-blue-600">
            {score}/{questions.length}
          </div>
          <p className="text-lg mb-4">
            You scored {Math.round((score / questions.length) * 100)}%
          </p>
          <Button onClick={resetQuiz}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  // Safety check for questions array and current question
  if (!questions || questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>No questions available for this quiz.</p>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  
  // Safety check for current question
  if (!question || !question.options) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>Question data is incomplete.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {title} - Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Scenario:</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded">{question.scenario}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Which approach would be best?</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded border-2 transition-colors ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showExplanation && index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            Score: {score}/{questions.length}
          </div>
          {!showExplanation ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioQuiz;