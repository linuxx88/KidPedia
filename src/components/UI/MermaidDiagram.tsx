import React, { useLayoutEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialisation globale de Mermaid avec un thème moderne et lisible
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  flowchart: {
    htmlLabels: false,
    curve: 'basis', // des courbes douces pour un rendu plus premium
    useMaxWidth: false, // évite de ratatiner le diagramme sur les grands écrans
  },
});

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let active = true;
    
    const renderDiagram = async () => {
      // Génère un ID unique et valide pour Mermaid (doit commencer par une lettre)
      const uniqueId = `mermaid-flow-${Math.random().toString(36).substring(2, 9)}`;
      
      try {
        // Rendu asynchrone sécurisé de Mermaid v10+
        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart);
        if (active) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: unknown) {
        console.error('[Mermaid] Error rendering diagram:', err);
        // Tente de récupérer le message d'erreur proprement
        if (active) {
          const errMsg = err instanceof Error ? err.message : String(err);
          setError(errMsg || 'Une erreur est survenue lors de la génération du diagramme.');
        }
        
        // Nettoie l'élément d'erreur Mermaid injecté dans le DOM s'il existe
        const badElement = document.getElementById(uniqueId);
        if (badElement) {
          badElement.remove();
        }
      }
    };

    renderDiagram();

    return () => {
      active = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div 
        style={{
          padding: '20px',
          border: '2px dashed #fca5a5',
          borderRadius: '16px',
          background: '#fef2f2',
          color: '#b91c1c',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          maxWidth: '100%',
          overflowX: 'auto',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>⚠️ Erreur de syntaxe dans le flux :</p>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{error}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        background: 'var(--card-bg, #ffffff)',
        borderRadius: '24px',
        border: '1px solid var(--border-color, #e2e8f0)',
        boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.05))',
        overflowX: 'auto',
        maxWidth: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className="mermaid-interactive-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
