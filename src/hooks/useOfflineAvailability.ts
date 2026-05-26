import { useState, useEffect } from 'react';

/**
 * Checks if a topic's JSON file is available in the browser's Cache Storage.
 * Handles the absence of the caches API silently.
 */
const checkCacheAvailability = async (topicId: string): Promise<boolean> => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }
  try {
    const url = `/content/topics/${topicId}.json`;
    const response = await window.caches.match(url);
    return !!response;
  } catch {
    return false;
  }
};

/**
 * Custom React hook to reactively query and check offline availability of a specific topic.
 * Zero any and highly resilient.
 */
export const useOfflineAvailability = (topicId: string | undefined): boolean => {
  const [isAvailableOffline, setIsAvailableOffline] = useState<boolean>(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!topicId) {
      setIsAvailableOffline(false);
      return;
    }

    let isMounted = true;

    const performCheck = async () => {
      const available = await checkCacheAvailability(topicId);
      if (isMounted) {
        setIsAvailableOffline(available);
      }
    };

    performCheck();

    const handleNetworkChange = () => {
      performCheck();
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      isMounted = false;
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, [topicId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return isAvailableOffline;
};
