import React from 'react'
import { originData } from '../../data/originData'
import { OriginsGrid } from './Components/OriginsGrid'
import styles from './Origins.module.css'

export const OriginsList: React.FC = () => {
  return (
    <div className={styles.board}>
      <OriginsGrid 
        nodes={originData} 
        getStroke={() => "url(#snakeGradient)"} 
      />
    </div>
  )
}
