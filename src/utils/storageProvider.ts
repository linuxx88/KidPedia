import { db } from './db';

/**
 * Interface/Classe abstraite CRUD pour le stockage de l'application.
 * Fournit une couche d'abstraction pour Zustand et les fonctionnalités internes de Smart Store.
 */
export abstract class StorageProvider {
  /**
   * Récupère une valeur brute par sa clé.
   */
  abstract getItem(key: string): Promise<string | null>;

  /**
   * Enregistre une valeur brute sous une clé.
   */
  abstract setItem(key: string, value: string): Promise<void>;

  /**
   * Supprime une valeur par sa clé.
   */
  abstract removeItem(key: string): Promise<void>;

  /**
   * Récupère un objet désérialisé typé.
   */
  async getObject<T>(key: string): Promise<T | null> {
    const data = await this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch (e) {
      console.warn(`[StorageProvider] Erreur lors du parsing JSON pour la clé ${key}:`, e);
      return null;
    }
  }

  /**
   * Enregistre un objet sérialisé en JSON.
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      await this.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`[StorageProvider] Erreur lors de la sérialisation de l'objet pour la clé ${key}:`, e);
    }
  }
}

/**
 * Implémentation concrète de StorageProvider basée sur Dexie (IndexedDB).
 * Intègre une logique de migration automatique depuis localStorage.
 */
export class DexieStorageProvider extends StorageProvider {
  async getItem(key: string): Promise<string | null> {
    try {
      // 1. Essayer de récupérer depuis Dexie/IndexedDB
      const entry = await db.keyval.get(key);
      if (entry) {
        return entry.value;
      }

      // 2. Fallback de migration : Vérifier localStorage s'il n'est pas présent dans Dexie
      if (typeof window !== 'undefined' && window.localStorage) {
        const localValue = window.localStorage.getItem(key);
        if (localValue) {
          // Migrer vers Dexie
          await this.setItem(key, localValue);
          // Nettoyer localStorage
          window.localStorage.removeItem(key);
          return localValue;
        }
      }

      return null;
    } catch (e) {
      console.error(`[DexieStorageProvider] Erreur getItem pour la clé ${key}:`, e);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await db.keyval.put({ key, value });
    } catch (e) {
      console.error(`[DexieStorageProvider] Erreur setItem pour la clé ${key}:`, e);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await db.keyval.delete(key);
    } catch (e) {
      console.error(`[DexieStorageProvider] Erreur removeItem pour la clé ${key}:`, e);
    }
  }
}

export const dexieStorageProvider = new DexieStorageProvider();
export default DexieStorageProvider;
