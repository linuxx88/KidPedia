import React from 'react'
import { InteractiveText } from './TopicView'
import { useStoryteller } from '../../hooks/useStoryteller'
import styles from './TopicFunFactBox.module.css'

interface TopicFunFactBoxProps {
  readonly funFact: string
  readonly anchorIcon?: string
  readonly didYouKnowLabel: string
}

export const TopicFunFactBox: React.FC<TopicFunFactBoxProps> = ({
  funFact,
  anchorIcon,
  didYouKnowLabel,
}) => {
  const { speak, stopStory } = useStoryteller()

  return (
    <div className={styles.topicFunFactBox}>
      <div className={styles.topicFunFactIcon}>{anchorIcon || '💡'}</div>
      <div className={styles.topicFunFactTitle}>
        <span className={styles.funFactLine}></span>
        {didYouKnowLabel}
      </div>
      <div className={styles.funFactContentWrapper}>
        <p className={styles.topicFunFactText}>
          "
          <InteractiveText 
            text={funFact} 
            onSpeak={() => { 
              stopStory()
              speak(`${didYouKnowLabel}. ${funFact}`)
            }} 
          />
          "
        </p>
      </div>
    </div>
  )
}
