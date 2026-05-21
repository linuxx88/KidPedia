/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import type { ReactNode } from 'react';
import { render as rtlRender, renderHook as rtlRenderHook } from '@testing-library/react';
import type { RenderOptions, RenderHookOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useProfileStore } from '../store/useProfileStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useProgressionStore } from '../store/useProgressionStore';
import { useQuizStore } from '../store/useQuizStore';
import { useDiscoveryStore } from '../store/useDiscoveryStore';
import { useSafariStore } from '../store/useSafariStore';
import { useEnvironmentStore } from '../store/useEnvironmentStore';

/**
 * Un wrapper global pour injecter tous les contextes nécessaires dans les tests.
 */
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
};

/**
 * Réinitialise tous les stores Zustand pour repartir sur une base saine.
 * À appeler dans le beforeEach des tests d'intégration.
 */
const resetAllStores = () => {
  localStorage.clear();
  useProfileStore.getState().reset();
  useSettingsStore.getState().reset();
  useProgressionStore.getState().reset();
  useQuizStore.getState().resetQuiz();
  useDiscoveryStore.getState().reset();
  useSafariStore.getState().reset();
  useEnvironmentStore.getState().reset();
};

const render = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

const renderHook = <Result, Props>(
  hook: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) => rtlRenderHook(hook, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { render, renderHook, resetAllStores };
