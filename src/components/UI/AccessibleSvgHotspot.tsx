import React from 'react';

interface AccessibleSvgHotspotProps {
  children: React.ReactElement;
  onClick?: () => void;
  'aria-label': string;
  className?: string;
}

/**
 * Composant AccessibleSvgHotspot
 * Rend n'importe quel élément SVG interactif et accessible (A11y).
 * Ajoute les rôles ARIA, la gestion du focus clavier et les événements Enter/Space.
 */
export const AccessibleSvgHotspot: React.FC<AccessibleSvgHotspotProps> = ({
  children,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Dans l'industrie, on supporte Enter et Space pour simuler un bouton
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  // On clone l'enfant pour lui injecter les propriétés d'accessibilité sans polluer le DOM
  if (!React.isValidElement(children)) {
    return children;
  }

  const childProps = children.props as React.SVGAttributes<SVGElement>;

  return React.cloneElement(children, {
    onClick,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    role: 'button',
    'aria-label': ariaLabel,
    // Fusion des classes CSS pour garder le style d'origine et ajouter celui de l'accessibilité
    className: `${childProps.className || ''} ${className} svg-accessible-hotspot`.trim(),
    style: { 
      ...childProps.style, 
      cursor: 'pointer',
      outline: 'none', 
      pointerEvents: 'auto' 
    },
  } as React.Attributes & React.SVGAttributes<SVGElement>);
};

export default AccessibleSvgHotspot;
