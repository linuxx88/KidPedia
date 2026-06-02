import React from 'react'
import styles from './QuizHeader.module.css'

interface QuizHeaderProps {
  readonly anchorIcon?: string
  readonly title: string
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ anchorIcon, title }) => {
  return (
    <div className={styles.quizHeader}>
      <span className={styles.quizHeaderIcon}>{anchorIcon || '🧩'}</span>
      <h3 className={styles.quizHeaderTitle}>{title}</h3>
    </div>
  )
}
