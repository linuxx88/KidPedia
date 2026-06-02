import React from 'react';
import styles from './MissionSafari.module.css';
import { SafariBoard } from './SafariBoard';
import { PageHeader } from '../Layout/PageHeader';
import { ThemeToggle } from '../UI/ThemeToggle';
import { AppOverlay } from '../UI/AppOverlay';
import { DiceRoller } from '../UI/DiceRoller';

import { EnvironmentDecor, ExplorersJournal } from './SafariDecorations';
import { useSafariGame } from '../../hooks/useSafariGame';
import { QuizComponent } from '../Learning/Quiz';
import { AppButton } from '../UI/AppButton';
import { OrientationGuard } from '../Layout/OrientationGuard';
import { VictoryCelebration } from './VictoryCelebration';
import { QUIZZES } from '../../data/quizzes';
import { type TopicId } from '../../types/domain';
import { useNavigationConfirm } from '../../hooks/useNavigationConfirm';

interface MissionSafariProps {
  onBack: () => void;
}

export const MissionSafari: React.FC<MissionSafariProps> = ({ onBack }) => {
  const {
    gender,
    language,
    labels,
    showQuitConfirm,
    setShowQuitConfirm,
    playerPosition,
    lastRoll,
    status,
    activeQuiz,
    inventory,
    diceColor,
    rollDice,
    handleQuizAnswer,
    reset,
    message,
    questProgress,
    quizResult,
    attempts,
    playerName,
    avatar,
    equippedAccessoryId,
    equippedCompanionId,
    onQuizSubmit,
    getCompanionIcon,
  } = useSafariGame();

  useNavigationConfirm({
    active: !!activeQuiz,
    message: labels.safari.quitConfirmMessage,
    onConfirm: () => {
      setShowQuitConfirm(false);
      handleQuizAnswer(false);
    }
  });

  const handleBack = () => {
    if (activeQuiz) {
      setShowQuitConfirm(true);
    } else {
      onBack();
    }
  };

  return (
    <OrientationGuard>
      <div className={styles.safariContainer}>
        <div className={styles.gameArea}>
          <PageHeader 
            title={labels.safari.title} 
            icon="🦁" 
            onBack={handleBack}
            rightElement={<ThemeToggle />}
          />
          
          <div className={styles.boardWrapper}>
            <EnvironmentDecor />
            
            <div className={styles.boardLayout}>
              <div className={styles.sidePanel}>
                <div className={styles.statsCard}>
                  <h3>{labels.safari.progressTitle}</h3>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: questProgress }}
                    ></div>
                  </div>
                  <p>{questProgress} {labels.safari.foundLabel}</p>
                </div>

                <div className={styles.controlsCard}>
                  <div className={styles.diceSection}>
                    <DiceRoller 
                      onRoll={rollDice} 
                      isRolling={status === 'ROLLING'}
                      color={diceColor}
                      value={lastRoll}
                    />
                    <AppButton 
                      onClick={rollDice} 
                      disabled={status !== 'IDLE'}
                      className={styles.rollBtn}
                      data-testid="roll-dice-button"
                    >
                      {labels.safari.rollDiceAction}
                    </AppButton>
                  </div>
                  
                  <div className={styles.messageBox} data-testid="safari-message">
                    <div className={styles.messageIcon}>
                      {getCompanionIcon()}
                    </div>
                    <p>{message}</p>
                    {lastRoll > 0 && status === 'IDLE' && (
                      <span className={styles.rollBadge}>+{lastRoll}</span>
                    )}
                  </div>
                </div>

                <ExplorersJournal inventory={inventory} />
              </div>

              <div className={styles.mainPanel}>
                <SafariBoard 
                  playerPosition={playerPosition} 
                  gender={gender}
                  playerAvatar={avatar}
                  playerName={playerName}
                  accessoryId={equippedAccessoryId}
                  companionId={equippedCompanionId}
                />
              </div>
            </div>
            
            {status === 'VICTORY' && (
              <VictoryCelebration gender={gender} onReset={reset} />
            )}

            <AppOverlay 
              isOpen={!!activeQuiz} 
              onClose={() => setShowQuitConfirm(true)}
              closeLabel={labels.common.close}
              title={activeQuiz ? labels.safari.discoveryTitle(activeQuiz.title[language]) : ""}
            >
              {activeQuiz && QUIZZES[activeQuiz.id as TopicId] && (
                <QuizComponent 
                  question={QUIZZES[activeQuiz.id as TopicId]!.question[language]}
                  options={QUIZZES[activeQuiz.id as TopicId]!.options[language]}
                  gender={gender}
                  retryMsg={null}
                  activeHint={null}
                  onReview={() => {}}
                  result={quizResult}
                  onAnswer={onQuizSubmit}
                  labels={labels}
                  attempts={attempts}
                  funFact={activeQuiz.funFact[language]}
                  categoryKey={activeQuiz.categoryKey}
                />
              )}
            </AppOverlay>

            <AppOverlay
              isOpen={showQuitConfirm}
              onClose={() => setShowQuitConfirm(false)}
              closeLabel={labels.common.close}
              title={labels.safari.quitConfirmTitle}
              maxWidth="500px"
            >
              <div className={styles.confirmModal}>
                <p>{labels.safari.quitConfirmMessage}</p>
                <div className={styles.confirmButtons}>
                  <AppButton onClick={() => setShowQuitConfirm(false)} variant="primary">
                    {labels.safari.quitConfirmNo}
                  </AppButton>
                  <AppButton 
                    onClick={() => {
                      setShowQuitConfirm(false);
                      handleQuizAnswer(false);
                    }} 
                    variant="secondary"
                  >
                    {labels.safari.quitConfirmYes}
                  </AppButton>
                </div>
              </div>
            </AppOverlay>
          </div>
        </div>
      </div>
    </OrientationGuard>
  );
};
