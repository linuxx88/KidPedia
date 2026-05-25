import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnvironmentStore, type Season } from '../../store/useEnvironmentStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { AccessibleSvgHotspot } from '../../components/UI/AccessibleSvgHotspot';
import { NATURE_ELEMENTS, type NatureElementInfo } from '../../data/natureData';
import styles from './LifeCirclePage.module.css';

interface LocalizedString {
  fr: string;
  en: string;
}

interface ElementDisplayDetail {
  name: LocalizedString;
  icon: string;
  desc: LocalizedString;
  funFact: LocalizedString;
}

const ELEMENT_DETAILS: Record<string, ElementDisplayDetail> = {
  trunk: {
    name: { fr: "Le Tronc de l'Arbre Sacré", en: "The Sacred Tree Trunk" },
    icon: "🌳",
    desc: {
      fr: "Le tronc est comme la colonne vertébrale de l'arbre. Il est très solide et transporte la sève pleine de nutriments de la terre jusqu'aux plus hautes feuilles.",
      en: "The trunk is like the backbone of the tree. It is extremely strong and carries nutrient-rich sap from the soil up to the highest leaves."
    },
    funFact: {
      fr: "L'écorce protège le tronc des insectes et du froid, exactement comme ton manteau en hiver !",
      en: "Bark protects the trunk from insects and cold weather, just like your coat in the winter!"
    }
  },
  roots: {
    name: { fr: "Les Réseaux de Racines", en: "The Root Networks" },
    icon: "🍄",
    desc: {
      fr: "Les racines ancrent fermement l'arbre dans la terre pour qu'il ne s'envole pas. Elles boivent aussi l'eau et collaborent étroitement avec les champignons pour s'entraider.",
      en: "Roots anchor the tree firmly in the ground so it doesn't blow away. They also absorb water and collaborate closely with mushrooms to help each other grow."
    },
    funFact: {
      fr: "Les racines et les champignons forment un 'internet de la forêt' pour s'échanger des messages et de la nourriture !",
      en: "Roots and fungi form a 'forest internet' to exchange messages and food underground!"
    }
  },
  root: {
    name: { fr: "La Racine Maîtresse", en: "The Taproot" },
    icon: "🌱",
    desc: {
      fr: "C'est la racine principale qui s'enfonce profondément sous terre à la recherche d'eau cachée tout au fond.",
      en: "This is the main root that grows deep underground in search of hidden water."
    },
    funFact: {
      fr: "Certaines racines maîtresses s'enfoncent à plus de 50 mètres de profondeur, soit la hauteur d'un grand immeuble !",
      en: "Some taproots dig more than 50 meters deep, which is as tall as a high-rise building!"
    }
  },
  leaf: {
    name: { fr: "La Feuille Magique", en: "The Magic Leaf" },
    icon: "🍃",
    desc: {
      fr: "Les feuilles captent la lumière du soleil pour fabriquer de la nourriture pour l'arbre. Elles respirent aussi pour purifier notre air.",
      en: "Leaves capture sunlight to make food for the tree. They also breathe to purify our air."
    },
    funFact: {
      fr: "En automne, les arbres récupèrent l'énergie verte de leurs feuilles, ce qui les fait devenir rouges, jaunes et oranges avant de tomber !",
      en: "In autumn, trees reclaim the green energy from their leaves, causing them to turn red, yellow, and orange before falling!"
    }
  },
  flower: {
    name: { fr: "La Fleur de Printemps", en: "The Spring Flower" },
    icon: "🌸",
    desc: {
      fr: "Les fleurs de l'arbre apparaissent au printemps. Elles sentent bon et attirent les pollinisateurs pour donner naissance à de futurs fruits.",
      en: "The tree's flowers appear in spring. They smell wonderful and attract pollinators to help give birth to future fruits."
    },
    funFact: {
      fr: "Certaines fleurs ne s'ouvrent que la nuit pour inviter les papillons de nuit à boire leur nectar !",
      en: "Some flowers only open at night to invite moths to drink their nectar!"
    }
  },
  fruit: {
    name: { fr: "Le Fruit Mûr", en: "The Ripe Fruit" },
    icon: "🍎",
    desc: {
      fr: "Le fruit protège les graines de l'arbre. Lorsqu'un oiseau ou un petit animal le mange, il aide à disperser les graines pour faire pousser de nouveaux arbres.",
      en: "The fruit protects the tree's seeds. When a bird or small animal eats it, it helps disperse the seeds to grow brand new trees."
    },
    funFact: {
      fr: "Les pommes flottent dans l'eau car elles contiennent 25% d'air ! C'est super amusant à tester.",
      en: "Apples float in water because they are 25% air! It's super fun to try."
    }
  },
  fish: {
    name: { fr: "Le Poisson de la Source", en: "The Spring Fish" },
    icon: "🐟",
    desc: {
      fr: "Ce joli poisson vit dans le ruisseau alimenté par l'eau pure filtrée par les racines de notre Arbre Sacré.",
      en: "This lovely fish lives in the stream fed by pure water filtered by the roots of our Sacred Tree."
    },
    funFact: {
      fr: "Les saumons peuvent retrouver leur rivière de naissance en utilisant uniquement leur incroyable sens de l'odorat !",
      en: "Salmon can find their way back to their river of birth using only their incredible sense of smell!"
    }
  },
  insect: {
    name: { fr: "L'Abeille Butineuse", en: "The Foraging Bee" },
    icon: "🐝",
    desc: {
      fr: "L'abeille récolte le pollen et le nectar des fleurs. En volant de fleur en fleur, elle aide les plantes à se reproduire.",
      en: "The bee collects pollen and nectar from flowers. By flying from flower to flower, it helps plants reproduce."
    },
    funFact: {
      fr: "Pour dire à ses amies où se trouvent les meilleures fleurs, l'abeille fait une petite danse spéciale en forme de 8 !",
      en: "To tell its friends where the best flowers are, the bee performs a special figure-8 dance!"
    }
  },
  animal: {
    name: { fr: "Le Lapin Agile", en: "The Agile Rabbit" },
    icon: "🐰",
    desc: {
      fr: "Ce petit lapin a creusé son terrier près de l'arbre pour s'abriter sous ses racines protectrices.",
      en: "This little rabbit dug its burrow near the tree to shelter under its protective roots."
    },
    funFact: {
      fr: "Les dents des lapins ne s'arrêtent jamais de pousser ! Ils doivent ronger du bois ou de l'herbe pour les user.",
      en: "Rabbits' teeth never stop growing! They must chew on wood or grass to wear them down."
    }
  }
};

export const LifeCirclePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentSeason, setSeason } = useEnvironmentStore();
  const addXP = useProgressionStore((state) => state.addXP);
  const language = useSettingsStore((state) => state.language);
  const labels = useSettingsStore((state) => state.labels);

  const [selectedElement, setSelectedElement] = useState<NatureElementInfo | null>(null);
  const [clickedElements, setClickedElements] = useState<string[]>([]);
  const [floatingXp, setFloatingXp] = useState<{ x: number; y: number; amount: number } | null>(null);
  const floatingXpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (floatingXpTimeoutRef.current) {
        clearTimeout(floatingXpTimeoutRef.current);
      }
    };
  }, []);

  const handleElementClick = (elementId: string, event?: React.MouseEvent<SVGElement>) => {
    const info = NATURE_ELEMENTS[elementId as keyof typeof NATURE_ELEMENTS];
    if (!info) return;

    setSelectedElement(info);

    // Gagner de l'XP si c'est la première fois dans cette visite
    if (!clickedElements.includes(elementId)) {
      const reward = info.xpReward !== undefined ? info.xpReward : 5;
      addXP(reward);
      setClickedElements((prev) => [...prev, elementId]);

      // Déclencher un petit effet flottant +XP
      if (event && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        setFloatingXp({ x, y, amount: reward });
        if (floatingXpTimeoutRef.current) {
          clearTimeout(floatingXpTimeoutRef.current);
        }
        floatingXpTimeoutRef.current = setTimeout(() => setFloatingXp(null), 1000);
      }
    }
  };

  const currentDetails = selectedElement ? ELEMENT_DETAILS[selectedElement.id] : null;

  return (
    <div className={`${styles.viewport} ${styles[currentSeason]}`} data-testid="life-circle-page">
      {/* Bouton de retour */}
      <button 
        className={styles.backButton} 
        onClick={() => navigate('/')}
        aria-label={labels.common.goHome}
      >
        <span>⬅</span> <span className={styles.backButtonText}>{labels.common.goHome}</span>
      </button>

      {/* Sélecteur de Saisons */}
      <div className={styles.seasonControls} role="group" aria-label="Choisir la saison">
        {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((season) => {
          const icons = { spring: '🌸', summer: '☀️', autumn: '🍂', winter: '❄️' };
          const seasonNames = {
            spring: { fr: 'Printemps', en: 'Spring' },
            summer: { fr: 'Été', en: 'Summer' },
            autumn: { fr: 'Automne', en: 'Autumn' },
            winter: { fr: 'Hiver', en: 'Winter' },
          };
          return (
            <button
              key={season}
              className={`${styles.seasonBtn} ${currentSeason === season ? styles.seasonBtnActive : ''}`}
              onClick={() => setSeason(season)}
              aria-label={`Changer de saison pour ${seasonNames[season][language]}`}
            >
              {icons[season]}
              <span>{seasonNames[season][language]}</span>
            </button>
          );
        })}
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <span>🌟</span>
        {language === 'fr' 
          ? "Fais défiler la page et clique sur l'arbre et les animaux pour explorer !" 
          : "Scroll down and click on the tree and animals to explore!"}
      </div>

      {/* Effet flottant XP */}
      {floatingXp && (
        <div 
          style={{
            position: 'fixed',
            left: floatingXp.x,
            top: floatingXp.y,
            transform: 'translate(-50%, -100%)',
            color: '#fbbf24',
            fontWeight: 800,
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(245,158,11,0.5)',
            pointerEvents: 'none',
            zIndex: 50,
            animation: 'fadeIn 0.8s ease-out forwards'
          }}
        >
          +{floatingXp.amount} XP!
        </div>
      )}

      {/* Conteneur principal de Parallaxe */}
      <div className={styles.parallaxContainer}>
        <div className={styles.parallaxGroup}>
          
          {/* LAYER 1: Deep Background (Sky and Atmosphere) */}
          <div className={`${styles.layer} ${styles.layerBackground}`}>
            <svg viewBox="0 0 1000 1000" className={styles.svgTreeWrapper} style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMin slice">
              {/* Soleil / Lune selon la saison */}
              {currentSeason === 'winter' ? (
                <circle cx="850" cy="180" r="50" fill="#e2e8f0" opacity="0.8" filter="drop-shadow(0 0 20px #94a3b8)" />
              ) : (
                <circle cx="850" cy="180" r="60" fill="#fef08a" opacity="0.9" filter="drop-shadow(0 0 30px #f59e0b)" />
              )}

              {/* Nuages stylisés */}
              <path d="M150,220 Q180,180 220,200 Q260,180 290,220 Q320,220 310,250 L130,250 Z" fill="#ffffff" opacity="0.25" />
              <path d="M700,320 Q730,290 760,310 Q790,290 820,320 Q840,330 830,350 L680,350 Z" fill="#ffffff" opacity="0.15" />
            </svg>
          </div>

          {/* LAYER 2: Midground (Distant Scenery & Silhouette Tree) */}
          <div className={`${styles.layer} ${styles.layerMidground}`}>
            <svg viewBox="0 0 1000 1000" className={styles.svgTreeWrapper} style={{ width: '100%', height: '100%' }}>
              {/* Montagnes d'arrière-plan */}
              <polygon points="-50,700 250,450 550,700" fill="#cbd5e1" opacity="0.8" />
              <polygon points="400,700 700,400 1050,700" fill="#94a3b8" opacity="0.85" />
              
              {/* Silhouettes d'arbres distants */}
              <path d="M100,600 L120,530 L140,600 Z" fill="#1e293b" opacity="0.3" />
              <path d="M130,610 L150,545 L170,610 Z" fill="#1e293b" opacity="0.3" />
              <path d="M850,620 L875,520 L900,620 Z" fill="#1e293b" opacity="0.4" />
            </svg>
          </div>

          {/* LAYER 3: Foreground (Main Interactive Sacred Tree & Ground) */}
          <div className={`${styles.layer} ${styles.layerForeground}`}>
            <svg viewBox="0 0 1000 1000" className={styles.svgTreeWrapper} style={{ width: '100%', height: '100%' }}>
              <defs>
                <radialGradient id="canopyGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" className={styles.foliage} />
                  <stop offset="100%" className={styles.leaves} />
                </radialGradient>
              </defs>

              {/* RUISSEAU (FOND) */}
              <path d="M 0,850 Q 250,820 500,850 T 1000,850 L 1000,1000 L 0,1000 Z" className={styles.water} />

              {/* SOL / GAZON */}
              <path d="M -50,780 Q 200,720 500,760 T 1050,780 L 1050,900 L -50,900 Z" className={styles.ground} />

              {/* --- TRONC D'ARBRE INTERACTIF --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.trunk.name[language]} 
                onClick={(e) => handleElementClick('trunk', e)}
              >
                <path 
                  id="trunk"
                  d="M 440,770 Q 420,500 380,450 Q 450,250 500,180 Q 550,250 620,450 Q 580,500 560,770 Z" 
                  fill="#5c3d24" 
                  stroke="#3b2314" 
                  strokeWidth="6"
                  className={`${styles.trunk} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(139, 90, 43, 0.8)' } as React.CSSProperties}
                />
              </AccessibleSvgHotspot>

              {/* Trou dans l'arbre pour l'animal */}
              <ellipse cx="500" cy="450" rx="30" ry="45" fill="#1e293b" />

              {/* --- FEUILLAGE D'ARBRE DE FOND --- */}
              <path d="M 280,300 C 150,300 120,150 250,100 C 200,0 400,-50 500,80 C 600,-50 800,0 750,100 C 880,150 850,300 720,300 Z" fill="url(#canopyGrad)" opacity="0.95" />

              {/* --- RACINES INTERACTIVES --- */}
              {/* Racine Gauche */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.roots.name[language]} 
                onClick={(e) => handleElementClick('roots', e)}
              >
                <g className={styles.interactiveElement} style={{ '--glow-color': 'rgba(239, 68, 68, 0.6)' } as React.CSSProperties}>
                  <path 
                    id="roots"
                    d="M 440,750 Q 300,780 200,880 Q 250,920 380,840 Q 430,800 450,760 Z" 
                    fill="#452a16"
                    className={styles.roots}
                  />
                  {/* Champignons mignons sur les racines */}
                  <g id="mushrooms" transform="translate(250, 780)">
                    {/* Invisible hit area for mushrooms (50px diameter) */}
                    <circle cx="20" cy="40" r="25" fill="transparent" />

                    <ellipse cx="20" cy="40" rx="12" ry="12" fill="#ef4444" />
                    <rect x="16" y="40" width="8" height="15" fill="#f8fafc" rx="4" />
                    <ellipse cx="20" cy="36" rx="12" ry="8" fill="#ef4444" />
                    <circle cx="16" cy="33" r="2" fill="#ffffff" />
                    <circle cx="24" cy="35" r="2" fill="#ffffff" />
                  </g>
                </g>
              </AccessibleSvgHotspot>

              {/* Racine Droite */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.root.name[language]} 
                onClick={(e) => handleElementClick('root', e)}
              >
                <path 
                  id="root"
                  d="M 560,750 Q 700,780 800,880 Q 750,920 620,840 Q 570,800 550,760 Z" 
                  fill="#452a16"
                  className={`${styles.root} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(239, 68, 68, 0.6)' } as React.CSSProperties}
                />
              </AccessibleSvgHotspot>

              {/* --- FEUILLE INTERACTIVE --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.leaf.name[language]} 
                onClick={(e) => handleElementClick('leaf', e)}
              >
                <path 
                  id="leaf"
                  d="M 280,320 C 230,340 180,300 240,260 C 290,240 320,280 280,320 Z" 
                  className={`${styles.leaf} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(74, 222, 128, 0.8)' } as React.CSSProperties}
                />
              </AccessibleSvgHotspot>

              {/* --- FLEURS INTERACTIVES (Visibles au printemps/été) --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.flower.name[language]} 
                onClick={(e) => handleElementClick('flower', e)}
              >
                <g 
                  id="flower" 
                  className={`${styles.flower} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(244, 114, 182, 0.9)' } as React.CSSProperties}
                >
                  {/* Fleur 1 */}
                  <g transform="translate(680, 220)">
                    <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.9" />
                    <circle cx="0" cy="-18" r="10" className={styles.flowers} />
                    <circle cx="18" cy="0" r="10" className={styles.flowers} />
                    <circle cx="0" cy="18" r="10" className={styles.flowers} />
                    <circle cx="-18" cy="0" r="10" className={styles.flowers} />
                    <circle cx="0" cy="0" r="8" fill="#fbbf24" />
                  </g>
                  {/* Fleur 2 */}
                  <g transform="translate(340, 160) scale(0.8)">
                    <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.9" />
                    <circle cx="0" cy="-18" r="10" className={styles.flowers} />
                    <circle cx="18" cy="0" r="10" className={styles.flowers} />
                    <circle cx="0" cy="18" r="10" className={styles.flowers} />
                    <circle cx="-18" cy="0" r="10" className={styles.flowers} />
                    <circle cx="0" cy="0" r="8" fill="#fbbf24" />
                  </g>
                </g>
              </AccessibleSvgHotspot>

              {/* --- FRUITS INTERACTIFS (Visibles été/automne) --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.fruit.name[language]} 
                onClick={(e) => handleElementClick('fruit', e)}
              >
                <g 
                  id="fruit" 
                  className={`${styles.fruit} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(239, 68, 68, 0.9)' } as React.CSSProperties}
                >
                  {/* Invisible hit areas for apples (50px diameter to reach 44px minimum) */}
                  <circle cx="450" cy="240" r="25" fill="transparent" />
                  <circle cx="580" cy="200" r="25" fill="transparent" />

                  {/* Pomme 1 */}
                  <circle cx="450" cy="240" r="18" className={styles.fruits} />
                  <path d="M 450,222 Q 453,212 458,215" stroke="#78350f" strokeWidth="3" fill="none" className={styles.fruits} />
                  
                  {/* Pomme 2 */}
                  <circle cx="580" cy="200" r="18" className={styles.fruits} />
                  <path d="M 580,182 Q 583,172 588,175" stroke="#78350f" strokeWidth="3" fill="none" className={styles.fruits} />
                </g>
              </AccessibleSvgHotspot>

              {/* --- POISSON INTERACTIF --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.fish.name[language]} 
                onClick={(e) => handleElementClick('fish', e)}
              >
                <g 
                  id="fish" 
                  transform="translate(200, 890)" 
                  className={`${styles.fish} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(56, 189, 248, 0.9)' } as React.CSSProperties}
                >
                  {/* Corps Poisson */}
                  <path d="M -30,0 C -10,-15 20,-15 30,0 C 20,15 -10,15 -30,0 Z" fill="#f97316" />
                  {/* Queue */}
                  <polygon points="-30,0 -45,-12 -40,0 -45,12" fill="#ea580c" />
                  {/* Œil */}
                  <circle cx="18" cy="-3" r="3" fill="#ffffff" />
                  <circle cx="19" cy="-3" r="1.5" fill="#000000" />
                </g>
              </AccessibleSvgHotspot>

              {/* --- INSECTE INTERACTIF (Abeille volante) --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.insect.name[language]} 
                onClick={(e) => handleElementClick('insect', e)}
              >
                <g 
                  id="insect" 
                  transform="translate(750, 360)" 
                  className={`${styles.insect} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(253, 224, 71, 0.9)' } as React.CSSProperties}
                >
                  {/* Invisible hit area for bee (50px diameter to reach 44px minimum) */}
                  <circle cx="0" cy="-6" r="25" fill="transparent" />

                  {/* Ailes */}
                  <ellipse cx="-4" cy="-12" rx="6" ry="12" fill="#cbd5e1" opacity="0.7" transform="rotate(-30)" />
                  <ellipse cx="6" cy="-12" rx="6" ry="12" fill="#cbd5e1" opacity="0.7" transform="rotate(30)" />
                  {/* Corps Abeille */}
                  <ellipse cx="0" cy="0" rx="16" ry="12" fill="#fbbf24" />
                  {/* Rayures noires */}
                  <path d="M -6,-10 L -6,10" stroke="#000000" strokeWidth="4" />
                  <path d="M 2,-12 L 2,12" stroke="#000000" strokeWidth="4" />
                </g>
              </AccessibleSvgHotspot>

              {/* --- ANIMAL INTERACTIF (Petit Lapin au pied de l'arbre) --- */}
              <AccessibleSvgHotspot 
                aria-label={ELEMENT_DETAILS.animal.name[language]} 
                onClick={(e) => handleElementClick('animal', e)}
              >
                <g 
                  id="animal" 
                  transform="translate(500, 480) scale(0.95)" 
                  className={`${styles.animal} ${styles.interactiveElement}`}
                  style={{ '--glow-color': 'rgba(255, 255, 255, 0.9)' } as React.CSSProperties}
                >
                  {/* Oreilles */}
                  <ellipse cx="-8" cy="-55" rx="6" ry="18" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                  <ellipse cx="-8" cy="-55" rx="3" ry="12" fill="#fbcfe8" />
                  <ellipse cx="8" cy="-55" rx="6" ry="18" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                  <ellipse cx="8" cy="-55" rx="3" ry="12" fill="#fbcfe8" />
                  {/* Tête */}
                  <circle cx="0" cy="-35" r="16" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="-5" cy="-38" r="2" fill="#0f172a" />
                  <circle cx="5" cy="-38" r="2" fill="#0f172a" />
                  <polygon points="0,-33 -3,-30 3,-30" fill="#f472b6" />
                </g>
              </AccessibleSvgHotspot>
            </svg>
          </div>

        </div>
      </div>

      {/* --- MODAL PÉDAGOGIQUE --- */}
      {selectedElement && currentDetails && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalContent}>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrapper}>
                <span className={styles.modalIcon} aria-hidden="true">{currentDetails.icon}</span>
                <h2 id="modal-title" className={styles.modalTitle}>{currentDetails.name[language]}</h2>
              </div>
              <button 
                className={styles.closeBtn} 
                onClick={() => setSelectedElement(null)}
                aria-label="Fermer la fenêtre"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.xpBadge}>
                <span>✨</span>
                +{selectedElement.xpReward !== undefined ? selectedElement.xpReward : 5} XP {language === 'fr' ? 'Gagnés !' : 'Earned!'}
              </div>

              <p className={styles.modalDescription}>
                {currentDetails.desc[language]}
              </p>

              <div className={styles.didYouKnowCard}>
                <h3 className={styles.didYouKnowTitle}>
                  <span>💡</span> {labels.discovery.knowMore}
                </h3>
                <p className={styles.didYouKnowText}>
                  {currentDetails.funFact[language]}
                </p>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.exploreMoreBtn}
                  onClick={() => {
                    navigate(`/topic/${selectedElement.topicId}`);
                    setSelectedElement(null);
                  }}
                >
                  {labels.discovery.explore(currentDetails.name[language])}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
