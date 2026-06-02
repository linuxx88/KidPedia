import { useEffect } from 'react';

interface NavigationConfirmOptions {
  active: boolean;
  message: string;
  onConfirm: () => void;
}

/**
 * Hook to prompt user confirmation before exiting a page or resetting state,
 * catching Escape, Backspace (when not in inputs), beforeunload, and browser popstate.
 */
export function useNavigationConfirm({ active, message, onConfirm }: NavigationConfirmOptions) {
  useEffect(() => {
    if (!active) return;

    // 1. Browser tab close / reload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    // 2. Keyboard shortcuts: Escape or Backspace (outside of inputs)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' ||
        (e.key === 'Backspace' &&
          !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(message)) {
          onConfirm();
        }
      }
    };

    // 3. Browser Back / history navigation (popstate)
    // Push a dummy state to history so we can capture the back navigation event
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (_e: PopStateEvent) => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        // Put the dummy state back to prevent navigation
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown, true); // Capture phase to prevent other events
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [active, message, onConfirm]);
}
