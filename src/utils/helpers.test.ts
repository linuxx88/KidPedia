import { describe, it, expect, vi } from 'vitest'
import { getGreeting } from './helpers'

describe('helpers', () => {
  describe('getGreeting', () => {
    it('retourne le message du matin avant midi', () => {
      vi.setSystemTime(new Date(2024, 1, 1, 9))
      expect(getGreeting()).toBe("Bonjour")
    })

    it('retourne le message de l\'après-midi entre midi et 18h', () => {
      vi.setSystemTime(new Date(2024, 1, 1, 14))
      expect(getGreeting()).toBe("Salut")
    })

    it('retourne le message du soir après 18h', () => {
      vi.setSystemTime(new Date(2024, 1, 1, 20))
      expect(getGreeting()).toBe("Bonsoir")
    })
  })
})
