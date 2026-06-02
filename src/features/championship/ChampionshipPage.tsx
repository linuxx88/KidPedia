import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizChampionshipStore } from '../../store/useQuizChampionshipStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProfileStore } from '../../store/useProfileStore';
import { AppButton } from '../../components/UI/AppButton';
import { launchCelebration } from '../../utils/celebrations';
import confetti from 'canvas-confetti';
import { ChampionshipLeaderboard } from './components/Leaderboard/ChampionshipLeaderboard';
import { ChampionshipQuestion } from './components/Question/ChampionshipQuestion';
import { useChampionshipSounds } from './hooks/useChampionshipSounds';
import { ResetButton } from '../../components/UI/ResetButton';
import styles from './ChampionshipPage.module.css';
import leaderboardStyles from './components/Leaderboard/ChampionshipLeaderboard.module.css';

export function ChampionshipPage() {
  const navigate = useNavigate();
  const { labels, language } = useSettingsStore();
  const activeProfile = useProfileStore((state) => state.activeProfile);
  const { playSound } = useChampionshipSounds();
  
  const {
    gameState,
    questions,
    currentQuestionIndex,
    correctAnswersCount,
    secondsRemaining,
    selectedAnswerIndex,
    hasAnsweredCurrent,
    isCorrectCurrent,
    totalTimeSpent,
    highScores,
    startChampionship,
    submitAnswer,
    nextQuestion,
    tickTimer,
    resetGame,
  } = useQuizChampionshipStore();

  const prevGameState = useRef(gameState);

  // Timer tick effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    const intervalId = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameState, tickTimer]);

  // Audio cues on timer ticking down
  useEffect(() => {
    if (gameState === 'playing' && !hasAnsweredCurrent) {
      if (secondsRemaining <= 5 && secondsRemaining > 0) {
        playSound('tick');
      } else if (secondsRemaining === 0) {
        playSound('timeout');
      }
    }
  }, [secondsRemaining, gameState, hasAnsweredCurrent, playSound]);

  // Handle victory celebration and transitions
  useEffect(() => {
    if (gameState === 'ended' && prevGameState.current === 'playing') {
      launchCelebration();
      playSound('victory');
      
      // If perfect, add a special gold explosion
      if (correctAnswersCount === 10) {
        const end = Date.now() + (3.5 * 1000);
        const goldInterval = setInterval(() => {
          if (Date.now() > end) return clearInterval(goldInterval);
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.8 },
            colors: ['#ffd700', '#ffa500', '#ffeb3b']
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.8 },
            colors: ['#ffd700', '#ffa500', '#ffeb3b']
          });
        }, 200);
      }
    }
    prevGameState.current = gameState;
  }, [gameState, correctAnswersCount, playSound]);

  const handleSelectOption = (idx: number) => {
    if (hasAnsweredCurrent) return;
    const { isCorrect } = submitAnswer(idx);
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  // Welcome Screen (Idle)
  if (gameState === 'idle') {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.trophyContainer}>🏆</div>
          <h2 className={styles.title}>{labels.championship.title}</h2>
          <p className={styles.subtitle}>{labels.championship.subtitle}</p>
          
          <button className={styles.startButton} onClick={startChampionship}>
            {labels.championship.startBtn}
          </button>
          
          <ChampionshipLeaderboard
            highScores={highScores}
            activeProfile={activeProfile}
            labels={labels}
            language={language}
          />
          
          <div className={styles.resetContainer} style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <ResetButton mode="championship" />
          </div>
        </div>
      </div>
    );
  }

  // Active game play
  if (gameState === 'playing') {
    const currentQuestionWrapper = questions[currentQuestionIndex];
    if (!currentQuestionWrapper) return null;

    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <ChampionshipQuestion
            currentQuestionIndex={currentQuestionIndex}
            correctAnswersCount={correctAnswersCount}
            secondsRemaining={secondsRemaining}
            selectedAnswerIndex={selectedAnswerIndex}
            hasAnsweredCurrent={hasAnsweredCurrent}
            isCorrectCurrent={isCorrectCurrent ?? false}
            questionWrapper={currentQuestionWrapper}
            labels={labels}
            language={language}
            handleSelectOption={handleSelectOption}
            nextQuestion={nextQuestion}
          />
        </div>
      </div>
    );
  }

  // End Game Screen (Summary / Scoreboard)
  if (gameState === 'ended') {
    const isNewRecord = highScores.length > 0 && highScores[0].score === correctAnswersCount && activeProfile && highScores[0].profileId === activeProfile.id;
    const isPerfect = correctAnswersCount === 10;
    const isGood = correctAnswersCount >= 7;

    const xpGained = (correctAnswersCount * 100) + (isPerfect ? 500 : 0);
    const ticketsGained = correctAnswersCount + (isPerfect ? 5 : 0);

    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.endHeader}>
            <div className={styles.trophyContainer}>
              {isPerfect ? '🏆' : isGood ? '🥈' : '🥉'}
            </div>
            {isNewRecord && (
              <span className={leaderboardStyles.newRecordBadge}>{labels.championship.newRecord}</span>
            )}
            <h2 className={styles.scoreTitle}>{labels.championship.scoreLabel}</h2>
            <div className={styles.scoreValue}>{correctAnswersCount} / 10</div>
            <div className={styles.timeSpentText} style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
              ⏱️ {totalTimeSpent}s
            </div>
            <p className={styles.endComment}>
              {isPerfect 
                ? labels.championship.perfectScore 
                : isGood 
                  ? labels.championship.goodScore 
                  : labels.championship.lowScore
              }
            </p>
          </div>

          {/* Reward highlights */}
          {(xpGained > 0 || ticketsGained > 0) && (
            <div className={styles.rewardCard}>
              {xpGained > 0 && (
                <div className={styles.rewardItem}>
                  {labels.championship.xpEarned(xpGained)}
                </div>
              )}
              {ticketsGained > 0 && (
                <div className={styles.rewardItem}>
                  {labels.championship.ticketsEarned(ticketsGained)}
                </div>
              )}
            </div>
          )}

          <div className={styles.endActions}>
            <AppButton onClick={startChampionship}>
              {labels.championship.replayBtn}
            </AppButton>
            <button className={styles.homeButton} onClick={() => { resetGame(); navigate('/'); }}>
              {labels.championship.homeBtn}
            </button>
          </div>

          <ChampionshipLeaderboard
            highScores={highScores}
            activeProfile={activeProfile}
            labels={labels}
            language={language}
          />
        </div>
      </div>
    );
  }

  return null;
}
