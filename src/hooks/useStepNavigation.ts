import { useState, useCallback, useEffect, useRef } from 'react';

interface UseStepNavigationOptions {
  totalSteps: number;
  initialStep?: number;
  loop?: boolean;
  autoPlayInterval?: number;
}

export const useStepNavigation = ({
  totalSteps,
  initialStep = 0,
  loop = true,
  autoPlayInterval,
}: UseStepNavigationOptions) => {
  const [[activeStep, direction], setState] = useState([initialStep, 0]);
  const [previousStep, setPreviousStep] = useState(initialStep);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      clearTimer();
      const newDirection = index > activeStep ? 1 : -1;
      setPreviousStep(activeStep);
      setState([index, newDirection]);
    },
    [activeStep, clearTimer]
  );

  const next = useCallback(() => {
    let nextIndex = activeStep + 1;
    if (nextIndex >= totalSteps) {
      if (loop) {
        nextIndex = 0;
      } else {
        return;
      }
    }
    setPreviousStep(activeStep);
    setState([nextIndex, 1]);
  }, [activeStep, totalSteps, loop]);

  const prev = useCallback(() => {
    clearTimer();
    let prevIndex = activeStep - 1;
    if (prevIndex < 0) {
      if (loop) {
        prevIndex = totalSteps - 1;
      } else {
        return;
      }
    }
    setPreviousStep(activeStep);
    setState([prevIndex, -1]);
  }, [activeStep, totalSteps, loop, clearTimer]);

  const manualNext = useCallback(() => {
    clearTimer();
    next();
  }, [clearTimer, next]);

  useEffect(() => {
    if (autoPlayInterval && autoPlayInterval > 0) {
      timerRef.current = setInterval(next, autoPlayInterval);
    }
    return clearTimer;
  }, [autoPlayInterval, next, clearTimer]);

  return {
    activeStep,
    previousStep,
    direction,
    next: manualNext,
    prev,
    goTo,
  };
};
