import { type Labels } from '../locales'
import type { Gender } from './helpers'

export type MedalType = 'gold' | 'silver' | 'bronze'

export const getRandomRetryMessage = (gender: Gender, labels: Labels) => {
  const messages = labels.quiz.retryMessages[gender]
  return messages[Math.floor(Math.random() * messages.length)]
}

export const getRandomMessage = (medal: MedalType, gender: Gender, labels: Labels) => {
  const messages = labels.quiz.successMessages[medal][gender]
  return messages[Math.floor(Math.random() * messages.length)]
}


export const getMedalIcon = (medal: MedalType): string => {
  if (medal === 'gold') return '🥇'
  if (medal === 'silver') return '🥈'
  return '🥉'
}
