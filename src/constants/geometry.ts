/**
 * Configuration géométrique pour les éléments SVG du projet.
 * Centralise les magic numbers pour faciliter la maintenance et les tests.
 */

export const ORIGINS_SVG_CONFIG = {
  /** Viewbox standard pour le tracé en serpentin */
  VIEWBOX: "-5 -5 110 110",
  
  /** Tracé du chemin SVG (Serpentin horizontal) */
  SNAKE_PATH: "M 16.6 16.6 L 83.3 16.6 A 16.6 16.6 0 0 1 83.3 50 L 16.6 50 A 16.6 16.6 0 0 0 16.6 83.3 L 83.3 83.3",
  
  /** Longueur de référence pour les animations de tracé (stroke-dasharray) */
  PATH_LENGTH: "1000",
};

export const NATURE_SVG_CONFIG = {
  /** Viewbox pour l'expérience NatureExplorer (Arbre central) */
  VIEWBOX: "0 0 400 800",
  
  /** Tracé de base d'une feuille stylisée */
  LEAF_PATH: "M0,0 C10,-10 20,-10 30,0 C20,10 10,10 0,0",
};

export const MAP_SVG_CONFIG = {
  /** Zoom maximum autorisé sur la carte */
  MAX_ZOOM: 3,
  
  /** Durée de l'effet d'onde (ripple) en ms */
  RIPPLE_DURATION: 500,
};

export const SAFARI_GEOMETRY = {
  /** Délai avant calcul du tracé après redimensionnement (ms) */
  PATH_CALC_DELAY: 300,
  
  /** Pas de déplacement pas-à-pas (ms) */
  STEP_DURATION: 800,
};
