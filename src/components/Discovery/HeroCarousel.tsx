import React from 'react'
import { AppImage } from '../UI/AppImage'
import { type HeroAsset } from '../../assets/hero'
import styles from './HeroCarousel.module.css'

interface HeroCarouselProps {
  images: HeroAsset[]
  activeStep: number
  previousStep: number
  children?: React.ReactNode
}

/**
 * Composant HeroCarousel (Dumb)
 * Affiche des images de fond avec un effet de transition.
 */
export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  images, 
  activeStep, 
  previousStep, 
  children 
}) => {
  return (
    <div className={styles.heroContainer}>
      {/* Image de fond précédente (pour le fondu) */}
      <AppImage
        src={images[previousStep].png}
        webpSrc={images[previousStep].webp}
        alt=""
        className={styles.bgCoverPrev}
        loader={<div className={styles.skeleton} />}
      />

      {/* Image de fond actuelle avec animation Ken Burns */}
      <AppImage
        key={activeStep}
        src={images[activeStep].png}
        webpSrc={images[activeStep].webp}
        alt=""
        className={styles.bgCoverCurrent}
        loader={<div className={styles.skeleton} />}
      />

      <div className={styles.heroGradient} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
