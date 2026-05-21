import React from 'react';

interface TransformedEmojiComponentProps {
  sizeClass?: string;
  customStyle?: React.CSSProperties;
  className?: string;
}

export const EMOJI_REGISTRY: Record<string, React.LazyExoticComponent<React.ComponentType<TransformedEmojiComponentProps>>> = {
  '🤖': React.lazy(() => import('./components/MiniRobotSVG')),
  '🐶': React.lazy(() => import('./components/MiniPuppySVG')),
  '🦕': React.lazy(() => import('./components/BabyDinoSVG')),
  '🤠': React.lazy(() => import('./components/ExplorerHatSVG')),
};
