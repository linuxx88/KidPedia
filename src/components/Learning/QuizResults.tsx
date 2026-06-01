import React from 'react'
import { type MedalType, getRandomMessage, getMedalIcon } from '../../utils/quizMessages'
import { type Gender } from '../../utils/helpers'
import { type Labels } from '../../locales/types'
import styles from './QuizResults.module.css'

interface QuizResultsProps {
  readonly result: { medal: MedalType }
  readonly gender: Gender
  readonly labels: Labels
  readonly language: string
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  gender,
  labels,
  language,
}) => {
  const medalStyles = {
    gold: {
      label: labels.quiz.goldMedal,
    },
    silver: {
      label: labels.quiz.silverMedal,
    },
    bronze: {
      label: labels.quiz.bronzeMedal,
    },
  }

  return (
    <div
      className={styles.resultBox}
      data-medal={result.medal}
    >
      {result.medal === 'gold' && (
        <div className={styles.perfectBanner} data-testid="perfect-banner">
          <span>{labels.quiz.perfectBadge}</span>
        </div>
      )}

      {/* Dynamic QC PASS stamp validation overlay */}
      <div className={styles.qcPassStamp} data-testid="qc-pass-stamp">
        <div className={styles.qcPassTitle}>★ KIDPEDIA ★</div>
        <div className={styles.qcPassBadge}>QC PASS</div>
        <div className={styles.qcPassStatus}>
          {language === 'fr' ? 'APPROUVÉ' : 'APPROVED'}
        </div>
      </div>

      <div className={styles.resultContent}>
        <div className={styles.resultIcon}>
          {getMedalIcon(result.medal)}
        </div>
        <h4 className={styles.resultTitle}>
          {getRandomMessage(result.medal, gender, labels)}
        </h4>
        <div className={styles.resultBadge}>
          {labels.quiz.winMessage(medalStyles[result.medal].label)}
        </div>
      </div>
    </div>
  )
}
