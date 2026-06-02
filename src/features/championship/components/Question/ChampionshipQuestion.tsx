import React from 'react';
import { type Labels } from '../../../../locales/types';
import { ChampionshipTimer } from '../Timer/ChampionshipTimer';
import questionStyles from './ChampionshipQuestion.module.css';

interface ChampionshipQuestionProps {
  currentQuestionIndex: number;
  correctAnswersCount: number;
  secondsRemaining: number;
  selectedAnswerIndex: number | null;
  hasAnsweredCurrent: boolean;
  isCorrectCurrent: boolean;
  questionWrapper: {
    quiz: {
      question: Record<string, string>;
      options: Record<string, string[]>;
      correctAnswer: number;
    };
  };
  labels: Labels;
  language: 'fr' | 'en';
  handleSelectOption: (idx: number) => void;
  nextQuestion: () => void;
}

export const ChampionshipQuestion: React.FC<ChampionshipQuestionProps> = ({
  currentQuestionIndex,
  correctAnswersCount,
  secondsRemaining,
  selectedAnswerIndex,
  hasAnsweredCurrent,
  isCorrectCurrent,
  questionWrapper,
  labels,
  language,
  handleSelectOption,
  nextQuestion,
}) => {
  const { quiz } = questionWrapper;
  const progressPercent = (currentQuestionIndex / 10) * 100;

  return (
    <>
      {/* Question progress and scores */}
      <div className={questionStyles.questionHeader}>
        <span className={questionStyles.questionNumber}>
          {labels.championship.questionTitle(currentQuestionIndex + 1, 10)}
        </span>
        <span className={questionStyles.scoreTracker}>
          ⭐ {correctAnswersCount} / {currentQuestionIndex}
        </span>
      </div>

      <div className={questionStyles.progressContainer}>
        <div 
          className={questionStyles.progressBarFill} 
          style={{ width: `${progressPercent}%` }} 
        />
      </div>

      {/* Interactive Matchstick countdown timer */}
      <ChampionshipTimer 
        secondsRemaining={secondsRemaining} 
        labels={labels} 
      />

      {/* Question Text */}
      <div className={questionStyles.questionBox}>
        <h3 className={questionStyles.questionText}>{quiz.question[language]}</h3>
      </div>

      {/* Options Grid */}
      <div className={questionStyles.optionsGrid}>
        {quiz.options[language].map((option, idx) => {
          const isSelected = selectedAnswerIndex === idx;
          const isCorrectAnswer = idx === quiz.correctAnswer;
          
          let cardStyle = questionStyles.optionCard;
          if (hasAnsweredCurrent) {
            cardStyle += ` ${questionStyles.optionCardDisabled} ${questionStyles.optionCardAnswered}`;
            if (isCorrectAnswer) {
              cardStyle += ` ${questionStyles.optionCardCorrect}`;
            } else if (isSelected) {
              cardStyle += ` ${questionStyles.optionCardIncorrect}`;
            }
          }

          return (
            <button
              key={idx}
              className={cardStyle}
              onClick={() => handleSelectOption(idx)}
              disabled={hasAnsweredCurrent}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Correct / Incorrect Alerts */}
      {hasAnsweredCurrent && (
        <div 
          className={`${questionStyles.alertBox} ${
            isCorrectCurrent ? questionStyles.alertBoxCorrect : questionStyles.alertBoxIncorrect
          }`}
        >
          {secondsRemaining === 0 ? (
            labels.championship.timesUp
          ) : isCorrectCurrent ? (
            labels.championship.correctAlert
          ) : (
            labels.championship.incorrectAlert
          )}
        </div>
      )}

      {/* Actions Footer */}
      {hasAnsweredCurrent && (
        <div className={questionStyles.actionsWrapper}>
          <button className={questionStyles.nextButton} onClick={nextQuestion}>
            {labels.championship.nextBtn}
          </button>
        </div>
      )}
    </>
  );
};
