import { db, type DbProfileProgression } from './db';

const isTestEnv = (): boolean => {
  const win = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : null;
  const glob = typeof globalThis !== 'undefined' ? (globalThis as unknown as Record<string, unknown>) : null;
  
  return !!(
    (win && (win.__vitest_environment__ || win.vi)) ||
    (glob && (glob.__vitest_environment__ || glob.vi))
  );
};

/**
 * Enregistre la progression d'un profil dans la table progression de Dexie.
 * Met à jour automatiquement la date de modification (updatedAt).
 *
 * @param data Les données complètes de progression du profil.
 * @returns Une Promise résolue lorsque l'enregistrement est réussi.
 */
export async function saveProgress(data: DbProfileProgression): Promise<void> {
  if (!data || !data.profileId) {
    return Promise.reject(
      new Error("[Storage] Erreur d'enregistrement : Données invalides ou 'profileId' manquant.")
    );
  }

  try {
    await db.progression.put({
      ...data,
      updatedAt: Date.now()
    });
  } catch (error) {
    if (!isTestEnv()) {
      console.error(
        `[Storage] Échec de la sauvegarde de la progression pour le profil ${data.profileId}:`,
        error
      );
    }
    throw error;
  }
}

/**
 * Récupère la progression enregistrée d'un profil via son identifiant unique.
 *
 * @param profileId L'identifiant unique du profil.
 * @returns Une Promise résolvant sur la progression du profil ou null si non trouvée.
 */
export async function getProgress(profileId: string): Promise<DbProfileProgression | null> {
  if (!profileId) {
    return Promise.reject(
      new Error("[Storage] Erreur de récupération : L'identifiant 'profileId' est requis.")
    );
  }

  try {
    const result = await db.progression.get(profileId);
    return result || null;
  } catch (error) {
    if (!isTestEnv()) {
      console.error(
        `[Storage] Échec de la récupération de la progression pour le profil ${profileId}:`,
        error
      );
    }
    throw error;
  }
}

/**
 * Récupère la liste complète des progressions enregistrées de tous les profils.
 * Utile pour les fonctionnalités multi-profils et d'administration.
 *
 * @returns Une Promise résolvant sur un tableau de progressions.
 */
export async function getAllProgress(): Promise<DbProfileProgression[]> {
  try {
    return await db.progression.toArray();
  } catch (error) {
    if (!isTestEnv()) {
      console.error("[Storage] Échec de la récupération de toutes les progressions:", error);
    }
    throw error;
  }
}

/**
 * Supprime la progression d'un profil spécifique.
 *
 * @param profileId L'identifiant unique du profil à supprimer.
 * @returns Une Promise résolue après suppression.
 */
export async function deleteProgress(profileId: string): Promise<void> {
  if (!profileId) {
    return Promise.reject(
      new Error("[Storage] Erreur de suppression : L'identifiant 'profileId' est requis.")
    );
  }

  try {
    await db.progression.delete(profileId);
  } catch (error) {
    if (!isTestEnv()) {
      console.error(
        `[Storage] Échec de la suppression de la progression pour le profil ${profileId}:`,
        error
      );
    }
    throw error;
  }
}
