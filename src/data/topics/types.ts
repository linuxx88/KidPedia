import type { SupportedLanguage } from '../../locales';
import type { TopicId } from '../../types/domain';

export type LocalizedString = Record<SupportedLanguage, string>;

export interface Quiz {
  question: LocalizedString
  options: Record<SupportedLanguage, string[]>
  correctAnswer: number
  explanation?: LocalizedString
  hint?: LocalizedString
}

export interface Topic {
  id: TopicId
  title: LocalizedString
  category: LocalizedString
  categoryKey: string
  icon: string
  shortDesc: LocalizedString
  fullContent: LocalizedString
  fullContents?: readonly LocalizedString[]
  funFact: LocalizedString
  funFacts?: readonly LocalizedString[]
  quiz?: Quiz
  audioFile?: string
  anchorIcon?: string
}

export interface TopicContent {
  id: string
  title: LocalizedString
  category: LocalizedString
  categoryKey: string
  icon: string
  shortDesc: LocalizedString
  fullContent: LocalizedString
  fullContents?: LocalizedString[]
  funFact: LocalizedString
  funFacts?: LocalizedString[]
  quiz?: Quiz
  quizzes?: Quiz[]
  audioFile?: string
  anchorIcon?: string
}

