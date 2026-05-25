import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizChampionshipStore, type ChampionshipHighScore } from '../../store/useQuizChampionshipStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProfileStore } from '../../store/useProfileStore';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import { AppButton } from '../../components/UI/AppButton';
import { launchCelebration } from '../../utils/celebrations';
import confetti from 'canvas-confetti';
import styles from './ChampionshipPage.module.css';

export function ChampionshipPage() {
  const navigate = useNavigate();
  const { labels, language, isMuted, isSfxMuted } = useSettingsStore();
  const activeProfile = useProfileStore((state) => state.activeProfile);
  
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

  // Play sound utility using Web Audio API
  const playSound = useCallback((type: 'correct' | 'incorrect' | 'tick' | 'victory' | 'timeout') => {
    if (isMuted || isSfxMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'correct') {
        // High sparkling bell chime arpeggio
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          
          gain.gain.setValueAtTime(0, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.3);
        });
      } 
      else if (type === 'incorrect') {
        // Sliding low buzz sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        
        // Low pass filter to make it softer
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
      else if (type === 'tick') {
        // Subtle click/tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
      else if (type === 'timeout') {
        // Double warning tick
        const now = ctx.currentTime;
        [0, 0.1].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now + delay);
          
          gain.gain.setValueAtTime(0.1, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
      }
      else if (type === 'victory') {
        // Triumphant fanfare arpeggio chords
        const now = ctx.currentTime;
        const chords = [
          [261.63, 329.63, 392.00], // C4, E4, G4
          [329.63, 392.00, 523.25], // E4, G4, C5
          [392.00, 523.25, 659.25], // G4, C5, E5
          [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
        ];
        
        chords.forEach((chord, step) => {
          chord.forEach((f) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + step * 0.15);
            
            gain.gain.setValueAtTime(0, now + step * 0.15);
            gain.gain.linearRampToValueAtTime(0.08, now + step * 0.15 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.15 + 0.5);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + step * 0.15);
            osc.stop(now + step * 0.15 + 0.65);
          });
        });
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }, [isMuted, isSfxMuted]);

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

  // Render high score leaderboard
  const renderLeaderboard = () => {
    return (
      <div className={styles.leaderboardSection}>
        <h3 className={styles.leaderboardTitle}>{labels.championship.leaderboardTitle}</h3>
        {highScores.length > 0 ? (
          <div className={styles.leaderboardList}>
            {highScores.map((score: ChampionshipHighScore, index: number) => {
              const isCurrentProfile = activeProfile && score.profileId === activeProfile.id;
              
              let rankStyle = styles.rankBadge;
              if (index === 0) rankStyle = `${styles.rankBadge} ${styles.rankBadgeGold}`;
              else if (index === 1) rankStyle = `${styles.rankBadge} ${styles.rankBadgeSilver}`;
              else if (index === 2) rankStyle = `${styles.rankBadge} ${styles.rankBadgeBronze}`;

              const formattedDate = new Date(score.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div 
                  key={score.id} 
                  className={`${styles.leaderboardItem} ${isCurrentProfile ? styles.leaderboardItemActive : ''}`}
                >
                  <div className={styles.leaderboardLeft}>
                    <div className={rankStyle}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    <div className={styles.playerInfo}>
                      <AvatarDisplay avatar={score.profileAvatar} size="small" name={score.profileName} />
                      <div>
                        <div className={styles.playerName}>{score.profileName}</div>
                        <div className={styles.timeSpentText}>{formattedDate} • {score.timeSpent}s</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.scoreBadge}>
                    <span>{score.score}</span> / 10
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.noScoresText}>{labels.championship.noScores}</p>
        )}
      </div>
    );
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
          
          {renderLeaderboard()}
        </div>
      </div>
    );
  }

  // Active game play
  if (gameState === 'playing') {
    const currentQuestionWrapper = questions[currentQuestionIndex];
    if (!currentQuestionWrapper) return null;
    const { quiz } = currentQuestionWrapper;
    const isWarningTime = secondsRemaining <= 5;
    const progressPercent = ((currentQuestionIndex) / 10) * 100;

    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          {/* Question progress and scores */}
          <div className={styles.questionHeader}>
            <span className={styles.questionNumber}>
              {labels.championship.questionTitle(currentQuestionIndex + 1, 10)}
            </span>
            <span className={styles.scoreTracker}>
              ⭐ {correctAnswersCount} / {currentQuestionIndex}
            </span>
          </div>

          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>

          {/* Interactive Matchstick countdown timer */}
          <div className={styles.timerWrapper}>
            <span className={styles.timerLabel}>{labels.championship.timeRemaining}</span>
            <svg viewBox="0 0 300 40" className={styles.matchstickSvg} aria-hidden="true">
              {/* The wood stick */}
              <rect x="0" y="16" width="100" height="8" rx="2" fill="#d7ccc8" />
              {/* The unburned wick (black / grey line) */}
              <path d="M 100 20 L 280 20" stroke="#757575" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,3" />
              {/* The burning wick line (red/orange) based on remaining time */}
              <path 
                d={`M 100 20 L ${100 + (180 * (secondsRemaining / 15))} 20`} 
                stroke="#ff5722" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
              {/* The flame at the junction */}
              {secondsRemaining > 0 && (
                <g transform={`translate(${100 + (180 * (secondsRemaining / 15))}, 20)`}>
                  <circle r="12" fill="#ffeb3b" opacity="0.6" className={styles.flameGlow} />
                  <text x="-10" y="7" fontSize="20" className={styles.flameEmoji}>🔥</text>
                </g>
              )}
            </svg>
            <span className={`${styles.secondsCount} ${isWarningTime ? styles.secondsWarning : ''}`}>
              {secondsRemaining === 0 ? labels.championship.timesUp : `${secondsRemaining}s`}
            </span>
          </div>

          {/* Question Text */}
          <div className={styles.questionBox}>
            <h3 className={styles.questionText}>{quiz.question[language]}</h3>
          </div>

          {/* Options Grid */}
          <div className={styles.optionsGrid}>
            {quiz.options[language].map((option, idx) => {
              const isSelected = selectedAnswerIndex === idx;
              const isCorrectAnswer = idx === quiz.correctAnswer;
              
              let cardStyle = styles.optionCard;
              if (hasAnsweredCurrent) {
                cardStyle += ` ${styles.optionCardDisabled} ${styles.optionCardAnswered}`;
                if (isCorrectAnswer) {
                  cardStyle += ` ${styles.optionCardCorrect}`;
                } else if (isSelected) {
                  cardStyle += ` ${styles.optionCardIncorrect}`;
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
              className={`${styles.alertBox} ${
                isCorrectCurrent ? styles.alertBoxCorrect : styles.alertBoxIncorrect
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
            <div className={styles.actionsWrapper}>
              <button className={styles.nextButton} onClick={nextQuestion}>
                {labels.championship.nextBtn}
              </button>
            </div>
          )}
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
              <span className={styles.newRecordBadge}>{labels.championship.newRecord}</span>
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

          {renderLeaderboard()}
        </div>
      </div>
    );
  }

  return null;
}
export default ChampionshipPage;
