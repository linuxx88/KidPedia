import React from 'react'
import { useStoryteller } from '../../hooks/useStoryteller'

interface InteractiveTextProps {
  readonly text: string
  readonly onSpeak: () => void
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ text, onSpeak }) => {
  const { isMagicWandActive } = useStoryteller()

  if (!isMagicWandActive) {
    return <>{text}</>
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onSpeak()
      }}
      className="magicWandInteractiveText"
      style={{
        cursor: 'help',
        textDecoration: 'underline dotted',
      }}
      title="Clique pour écouter !"
    >
      {text}
    </span>
  )
}
