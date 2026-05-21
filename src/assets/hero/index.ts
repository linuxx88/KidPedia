import boySpaceWebp from './boy_space.webp';
import boySpacePng from './boy_space.png';
import boyDinoWebp from './boy_dino.webp';
import boyDinoPng from './boy_dino.png';
import boyRobotWebp from './boy_robot.webp';
import boyRobotPng from './boy_robot.png';

import girlNatureWebp from './girl_nature.webp';
import girlNaturePng from './girl_nature.png';
import girlOceanWebp from './girl_ocean.webp';
import girlOceanPng from './girl_ocean.png';
import girlArtistWebp from './girl_artist.webp';
import girlArtistPng from './girl_artist.png';

export interface HeroAsset {
  webp: string;
  png: string;
}

export const heroAssets: Record<'boy' | 'girl', HeroAsset[]> = {
  boy: [
    { webp: boySpaceWebp, png: boySpacePng },
    { webp: boyDinoWebp, png: boyDinoPng },
    { webp: boyRobotWebp, png: boyRobotPng },
  ],
  girl: [
    { webp: girlNatureWebp, png: girlNaturePng },
    { webp: girlOceanWebp, png: girlOceanPng },
    { webp: girlArtistWebp, png: girlArtistPng },
  ],
};
