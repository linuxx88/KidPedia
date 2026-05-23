import React, { useEffect } from 'react';
import styles from './MissionSafari.module.css';
import { SafariBoard } from './SafariBoard';
import { PageHeader } from '../Layout/PageHeader';
import { ThemeToggle } from '../UI/ThemeToggle';
import { AppOverlay } from '../UI/AppOverlay';
import { DiceRoller } from '../UI/DiceRoller';

import { EnvironmentDecor, ExplorersJournal } from './SafariDecorations';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useQuizStore } from '../../store/useQuizStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useSafariStore, QUEST_GOAL } from '../../store/useSafariStore';
import type { SafariEventCode, SafariEventData } from '../../store/useSafariStore';
import type { Labels, SupportedLanguage } from '../../locales/types';
import { useProgressionStore } from '../../store/useProgressionStore';
import { QuizComponent } from '../Learning/Quiz';
import { AppButton } from '../UI/AppButton';
import { OrientationGuard } from '../Layout/OrientationGuard';
import { VictoryCelebration } from './VictoryCelebration';
import { QUIZZES } from '../../data/quizzes';
import { type TopicId } from '../../types/domain';

interface MissionSafariProps {
  onBack: () => void;
}

export const MissionSafari: React.FC<MissionSafariProps> = ({ onBack }) => {
  const { gender, language, labels } = useSettingsStore();
  const [showQuitConfirm, setShowQuitConfirm] = React.useState(false);
  
  // SÉLECTEURS SAFARI (ZUSTAND)
  const playerPosition = useSafariStore(state => state.playerPosition);
  const lastRoll = useSafariStore(state => state.lastRoll);
  const status = useSafariStore(state => state.status);
  const activeQuiz = useSafariStore(state => state.activeQuiz);
  const eventCode = useSafariStore(state => state.eventCode);
  const eventData = useSafariStore(state => state.eventData);
  const inventory = useSafariStore(state => state.inventory);
  const diceColor = useSafariStore(state => state.diceColor);
  const rollDice = useSafariStore(state => state.rollDice);
  const handleQuizAnswer = useSafariStore(state => state.handleQuizAnswer);
  const reset = useSafariStore(state => state.reset);

  // Résolveur de message UI (I18n découplée du store) - Approche polymorphe
  const messageResolvers: Record<SafariEventCode, (l: Labels, d: SafariEventData | null, lang: SupportedLanguage) => string> = {
    WELCOME: (l) => l.safari.welcome,
    DICE_ROLL: (l, d) => l.safari.diceRoll(d?.value || 0),
    ANIMAL_ENCOUNTER: (l, d) => l.safari.animalEncounter(d?.label || ''),
    ALREADY_HAVE: (l, d) => l.safari.alreadyHave(d?.label || ''),
    BOOST: (l, d) => l.safari.boost(d?.label || ''),
    HAZARD: (l, d) => l.safari.hazard(d?.label || ''),
    QUIZ_SUCCESS: (l, d, lang) => l.safari.quizSuccess(d?.title?.[lang] || ''),
    QUIZ_FAILURE: (l) => l.safari.quizFailure,
    MISSING_ANIMALS: (l, d) => l.safari.missingAnimals(d?.current || 0, d?.goal || QUEST_GOAL),
    VICTORY: (l) => l.safari.victory,
    RESET: (l) => l.safari.reset,
    CELL_LABEL: (_, d) => d?.label || '',
  };

  const message = messageResolvers[eventCode]?.(labels, eventData, language) || '';
  const questProgress = labels.safari.progress(inventory.length, QUEST_GOAL);

  // SÉLECTEURS QUIZ (ZUSTAND)
  const startQuiz = useQuizStore(state => state.startQuiz);
  const submitAnswer = useQuizStore(state => state.submitAnswer);
  const quizResult = useQuizStore(state => state.quizResult);
  const attempts = useQuizStore(state => state.attempts);

  const addBadge = useProgressionStore(state => state.addBadge);
  const { playerName, avatar } = usePlayerStore();
  const equippedAccessoryId = useProgressionStore(state => state.getEquippedAccessoryId());
  const equippedCompanionId = useProgressionStore(state => state.getEquippedCompanionId());

  // Synchronisation du store de quiz avec l'animal rencontré
  useEffect(() => {
    if (activeQuiz) {
      startQuiz(activeQuiz.id as TopicId);
    }
  }, [activeQuiz, startQuiz]);

  // Nettoyage au démontage pour stopper toute tâche asynchrone en cours (Ticket #17)
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onQuizSubmit = (index: number) => {
    const { success, medal } = submitAnswer(index);
    // On notifie le moteur de jeu Safari pour qu'il avance (résolution de la case)
    handleQuizAnswer(success);

    // Enregistrer la progression globale
    if (success && medal && activeQuiz) {
      addBadge(activeQuiz.id as TopicId, medal);
    }
  };

  const getCompanionIcon = () => {
    if (equippedCompanionId === 'chien') return '🐶';
    if (equippedCompanionId === 'dino') return '🦕';
    if (equippedCompanionId === 'robot') return '🤖';
    if (equippedCompanionId === 'chat') return '🐱';
    if (equippedCompanionId === 'perroquet') return '🦜';
    if (equippedCompanionId === 'licorne') return '🦄';
    return '🦁'; // Guide Safari par défaut
  };

  return (
    <OrientationGuard>
      <div className={styles.safariContainer}>
        <div className={styles.gameArea}>
          <PageHeader 
            title={labels.safari.title} 
            icon="🦁" 
            onBack={onBack}
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

export default MissionSafari;
