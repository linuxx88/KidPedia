import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { OfflineFallback } from '../UI/OfflineFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private isChunkLoadError(error: Error | null): boolean {
    if (!error) return false;
    const msg = error.message || '';
    return (
      msg.includes('Failed to fetch') ||
      msg.includes('dynamically imported') ||
      msg.includes('ChunkLoadError') ||
      msg.includes('Loading chunk') ||
      msg.includes('loading css chunk') ||
      error.name === 'ChunkLoadError'
    );
  }

  public render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const isOffline = this.isChunkLoadError(error) || !navigator.onLine;

      if (isOffline) {
        return (
          <OfflineFallback
            onRetry={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          />
        );
      }

      // Non-network/JS Error Fallback
      // Let's load the labels dynamically from the Zustand store
      let title = "Oups ! Une petite panne magique... 🪄";
      let message = "KidPedia a rencontré un petit problème. Clique ci-dessous pour redémarrer le jeu !";

      try {
        const store = useSettingsStore.getState();
        const lang = store.language;
        if (lang === 'en') {
          title = "Oops! A little magical breakdown... 🪄";
          message = "KidPedia ran into a small problem. Click below to restart the game!";
        }
      } catch (e) {
        console.error('Failed to load localized strings in ErrorBoundary:', e);
      }

      return (
        <OfflineFallback
          title={title}
          message={message}
          onRetry={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}
