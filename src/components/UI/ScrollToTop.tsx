import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant utilitaire qui remonte en haut de la page à chaque changement de route.
 * À placer au sommet de l'arborescence des composants (à l'intérieur du Router).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Bam. Chaque fois que l'URL change, on remonte en haut proprement.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
