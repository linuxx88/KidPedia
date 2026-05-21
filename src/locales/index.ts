import { fr } from './fr';
import { en } from './en';
import type { SupportedLanguage, Labels } from './types';

export const locales: Record<SupportedLanguage, Labels> = {
  fr,
  en,
};

export * from './types';
