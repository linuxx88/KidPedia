import React from 'react';

/**
 * AppGradients - Centralized SVG resource module.
 * 
 * This component defines SVG <defs> (gradients, filters, masks) that are 
 * referenced by ID in CSS (e.g., fill: url(#logo-gradient)) or other SVGs.
 * 
 * Placing this at the root of the app ensures that these resources are 
 * always available in the DOM, solving issues with external SVG sprite 
 * reference limitations in some browsers.
 */
export const AppGradients: React.FC = () => {
  return (
    <svg 
      style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} 
      aria-hidden="true"
      id="kp-global-gradients"
    >
      <defs>
        {/* Main Logo Gradient - Uses CSS variables for theme/gender awareness */}
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-explorer-blue)" />
          <stop offset="100%" stopColor="var(--color-explorer-amethyst)" />
        </linearGradient>

        {/* Future gradients can be added here (e.g., fire-gradient, gold-gradient) */}
      </defs>
    </svg>
  );
};

export default AppGradients;
