import React from 'react';
import { PageHeader } from '../../components/Layout/PageHeader';
import { InteractiveFlowChart } from './components/InteractiveFlowChart/InteractiveFlowChart';
import styles from './FlowDashboard.module.css';

export const FlowDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className={styles.container}>
      <PageHeader 
        title="Visualisateur de Flux" 
        icon="🛠️" 
        onBack={onBack} 
      />

      <div className={styles.content}>
        <div className={styles.card}>
          <InteractiveFlowChart />
        </div>
      </div>
    </div>
  );
};
