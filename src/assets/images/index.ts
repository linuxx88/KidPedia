// World Map
import worldMapJpg from './world-map.jpg';
import worldMapPng from './world-map.png';
import worldMapWebp from './world-map.webp';

// Circle of Life
import carnivoresPng from './circle/carnivores.png';
import carnivoresWebp from './circle/carnivores.webp';
import decomposersPng from './circle/decomposers.png';
import decomposersWebp from './circle/decomposers.webp';
import herbivoresPng from './circle/herbivores.png';
import herbivoresWebp from './circle/herbivores.webp';
import producersPng from './circle/producers.png';
import producersWebp from './circle/producers.webp';
import sunPng from './circle/sun.png';
import sunWebp from './circle/sun.webp';

export const imageAssets = {
  worldMap: {
    jpg: worldMapJpg,
    png: worldMapPng,
    webp: worldMapWebp,
  },
  circle: {
    carnivores: { png: carnivoresPng, webp: carnivoresWebp },
    decomposers: { png: decomposersPng, webp: decomposersWebp },
    herbivores: { png: herbivoresPng, webp: herbivoresWebp },
    producers: { png: producersPng, webp: producersWebp },
    sun: { png: sunPng, webp: sunWebp },
  },
};
