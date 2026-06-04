import { useNotificationStore } from '../../../../../store/useNotificationStore';
import { PROJECT_FLOW_CHART } from '../flowData';

export const useFlowChartExporter = () => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROJECT_FLOW_CHART).then(() => {
      useNotificationStore.getState().addNotification({
        type: 'xp',
        title: 'Copié !',
        message: 'Le code Mermaid du flux a été copié dans le presse-papier.',
        icon: '📋',
        duration: 3000
      });
    }).catch(() => {
      alert('Impossible de copier.');
    });
  };

  const getInlinedSvgBlob = () => {
    const container = document.querySelector('.mermaid-interactive-container');
    const svgEl = container?.querySelector('svg');
    if (!svgEl) return null;

    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;

    const inlineStyles = (original: Element, clone: Element) => {
      const computed = window.getComputedStyle(original);
      const propertiesToCopy = [
        'fill',
        'stroke',
        'stroke-width',
        'stroke-dasharray',
        'font-family',
        'font-size',
        'font-weight',
        'text-anchor',
        'opacity'
      ];

      propertiesToCopy.forEach(prop => {
        const val = computed.getPropertyValue(prop);
        if (val) {
          clone.setAttribute(prop, val);
        }
      });

      const originalChildren = Array.from(original.children);
      const cloneChildren = Array.from(clone.children);
      
      for (let i = 0; i < originalChildren.length; i++) {
        if (cloneChildren[i]) {
          inlineStyles(originalChildren[i] as Element, cloneChildren[i] as Element);
        }
      }
    };

    inlineStyles(svgEl, clonedSvg);

    const bbox = svgEl.getBoundingClientRect();
    if (bbox.width && bbox.height) {
      if (!clonedSvg.getAttribute('width')) {
        clonedSvg.setAttribute('width', `${bbox.width}px`);
      }
      if (!clonedSvg.getAttribute('height')) {
        clonedSvg.setAttribute('height', `${bbox.height}px`);
      }
    }

    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    return new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  };

  const handleDownloadSVG = () => {
    const svgBlob = getInlinedSvgBlob();
    if (svgBlob) {
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'kidpedia-architecture-flow.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);

      useNotificationStore.getState().addNotification({
        type: 'xp',
        title: 'Téléchargé !',
        message: 'Le diagramme vectoriel SVG autonome a été téléchargé.',
        icon: '💾',
        duration: 3000
      });
    } else {
      alert('Le diagramme de flux n\'a pas pu être trouvé.');
    }
  };

  const handleDownloadPNG = () => {
    const container = document.querySelector('.mermaid-interactive-container');
    const svgEl = container?.querySelector('svg');
    if (svgEl) {
      const svgBlob = getInlinedSvgBlob();
      if (!svgBlob) return;
      const svgUrl = URL.createObjectURL(svgBlob);

      const bbox = svgEl.getBoundingClientRect();
      const width = bbox.width || 1000;
      const height = bbox.height || 750;

      const img = new Image();
      img.onload = () => {
        const scale = 2;
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0, width, height);

          try {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'kidpedia-architecture-flow.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            useNotificationStore.getState().addNotification({
              type: 'xp',
              title: 'Téléchargé !',
              message: 'L\'image PNG haute résolution autonome a été téléchargée.',
              icon: '🖼️',
              duration: 3000
            });
          } catch (e) {
            console.error('[FlowDashboard] PNG Export error :', e);
            alert('Impossible de générer le fichier PNG.');
          }
        }
        URL.revokeObjectURL(svgUrl);
      };

      img.onerror = (err) => {
        console.error('[FlowDashboard] Image load error :', err);
        alert('Erreur lors du chargement des ressources graphiques.');
        URL.revokeObjectURL(svgUrl);
      };

      img.src = svgUrl;
    } else {
      alert('Le diagramme de flux n\'a pas pu être trouvé.');
    }
  };

  return {
    handleCopyCode,
    handleDownloadSVG,
    handleDownloadPNG,
  };
};
