import { useState, useEffect } from 'react';
import { type TopicContent } from '../data/topics/types';

export interface UseTopicFetcherResult {
  data: TopicContent | null;
  isLoading: boolean;
  error: Error | null;
}

export const useTopicFetcher = (topicId: string | undefined): UseTopicFetcherResult => {
  const [data, setData] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!topicId) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(`/content/topics/${topicId}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch topic content: ${res.statusText || res.status}`);
        }
        return res.json();
      })
      .then((topicData: TopicContent) => {
        if (isMounted) {
          setData(topicData);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setData(null);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [topicId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { data, isLoading, error };
};
