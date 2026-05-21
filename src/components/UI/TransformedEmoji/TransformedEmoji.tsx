import React from 'react';
import styles from './TransformedEmoji.module.css';
import { EMOJI_REGISTRY } from './registry';

interface TransformedEmojiProps {
  emoji: string;
  size?: 'small' | 'medium' | 'large' | 'huge' | number;
  className?: string;
}

/**
 * TransformedEmoji
 * Routeur d'émojis modulaire et léger. Charge à la demande (Lazy-loading)
 * les compagnons premium animés (Robot 🤖, Chien 🐶, Bébé Dino 🦕)
 * et utilise un fallback Unicode classique pour les autres émojis.
 */
export const TransformedEmoji: React.FC<TransformedEmojiProps> = ({
  emoji,
  size = 'medium',
  className = ''
}) => {
  const isStringSize = typeof size === 'string';
  const sizeClass = isStringSize ? size : undefined;
  const customStyle: React.CSSProperties = !isStringSize
    ? ({
        '--emoji-size': `${size}px`,
        width: size,
        height: size,
      } as React.CSSProperties)
    : {};

  const LazyComponent = EMOJI_REGISTRY[emoji];

  if (LazyComponent) {
    return (
      <React.Suspense
        fallback={
          <span
            className={[
              styles.unicodeEmoji,
              sizeClass ? styles[sizeClass] : '',
              className
            ].filter(Boolean).join(' ')}
            style={customStyle}
            data-testid="unicode-fallback"
          >
            {emoji}
          </span>
        }
      >
        <LazyComponent
          sizeClass={sizeClass}
          customStyle={customStyle}
          className={className}
        />
      </React.Suspense>
    );
  }

  // Fallback universel pour les autres émojis
  const fallbackClasses = [
    styles.unicodeEmoji,
    sizeClass ? styles[sizeClass] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span
      className={fallbackClasses}
      style={customStyle}
      data-testid="unicode-fallback"
    >
      {emoji}
    </span>
  );
};
