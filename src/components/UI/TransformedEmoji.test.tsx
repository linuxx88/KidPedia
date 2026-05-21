import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TransformedEmoji } from './TransformedEmoji';

describe('TransformedEmoji', () => {
  it('affiche un émoji standard en tant que texte avec le fallback unicode', () => {
    render(<TransformedEmoji emoji="🦁" />);
    
    const element = screen.getByTestId('unicode-fallback');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('🦁');
  });

  it('intercepte l\'émoji robot 🤖 et affiche le composant SVG premium', async () => {
    render(<TransformedEmoji emoji="🤖" />);
    
    const element = await screen.findByTestId('transformed-robot');
    expect(element).toBeInTheDocument();
    
    // Vérifie la présence du conteneur SVG interne
    const svgElement = element.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('intercepte l\'émoji chien 🐶 et affiche le composant SVG premium du chiot', async () => {
    render(<TransformedEmoji emoji="🐶" />);
    
    const element = await screen.findByTestId('transformed-puppy');
    expect(element).toBeInTheDocument();
    
    // Vérifie la présence du conteneur SVG interne
    const svgElement = element.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('intercepte l\'émoji dinosaure 🦕 et affiche le composant SVG premium du bébé dino', async () => {
    render(<TransformedEmoji emoji="🦕" />);
    
    const element = await screen.findByTestId('transformed-dino');
    expect(element).toBeInTheDocument();
    
    // Vérifie la présence du conteneur SVG interne
    const svgElement = element.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
  });

  it('intercepte l\'émoji chapeau de brousse 🤠 et affiche le composant SVG premium', async () => {
    render(<TransformedEmoji emoji="🤠" />);
    
    const element = await screen.findByTestId('transformed-hat');
    expect(element).toBeInTheDocument();
    
    // Vérifie la présence du conteneur SVG interne
    const svgElement = element.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
  });


  it('applique correctement la classe de taille prédéfinie ("small", "medium", "large")', async () => {
    const { rerender } = render(<TransformedEmoji emoji="🤖" size="small" />);
    
    let robot = await screen.findByTestId('transformed-robot');
    expect(robot.className).toContain('small');

    rerender(<TransformedEmoji emoji="🤖" size="large" />);
    robot = await screen.findByTestId('transformed-robot');
    expect(robot.className).toContain('large');
  });

  it('applique correctement les styles en pixels lorsque la taille est un nombre', async () => {
    render(<TransformedEmoji emoji="🤖" size={64} />);
    
    const robot = await screen.findByTestId('transformed-robot');
    expect(robot).toHaveStyle({
      width: '64px',
      height: '64px',
    });
  });

  it('ajoute des classes CSS personnalisées fournies via className', () => {
    render(<TransformedEmoji emoji="🦁" className="mon-emoji-classe" />);
    
    const element = screen.getByTestId('unicode-fallback');
    expect(element.className).toContain('mon-emoji-classe');
  });
});
