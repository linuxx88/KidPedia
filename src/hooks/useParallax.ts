import { useState, useEffect } from 'react';

/**
 * Hook useParallax - Calcule les décalages de transformation pour un effet de parallaxe.
 * @param strength - Facteur de multiplication de l'effet. Plus il est élevé, plus le mouvement est prononcé.
 */
export const useParallax = (strength: number = 20) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // On normalise la position de scroll en un facteur entre -0.5 et 0.5
      // pour que l'effet soit centré au milieu de la page.
      const scrollFactor = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) - 0.5;
      setOffsetY(scrollFactor * strength);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  // On retourne des styles directement applicables pour chaque couche
  return {
    layer1: { transform: `translateY(${offsetY * 0.2}px)` }, // Le plus lointain, bouge le moins
    layer2: { transform: `translateY(${offsetY * 0.5}px)` },
    layer3: { transform: `translateY(${offsetY * 1}px)` },   // Le plus proche, bouge le plus
  };
};
