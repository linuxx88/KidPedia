import { LABELS } from './labels'

export type Gender = 'boy' | 'girl'

export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return LABELS.home.morning
  if (hour < 18) return LABELS.home.afternoon
  return LABELS.home.evening
}

