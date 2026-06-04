import { type Profile } from '../store/useProfileStore';
import { type DbProfileProgression } from './db';
import { getAllProgress, saveProgress, deleteProgress } from './storage';

function getApiUrl(path: string): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin.startsWith('http')) {
    // Avoid double slashes if origin ends with a slash (though origin standardly doesn't)
    const origin = window.location.origin.endsWith('/') ? window.location.origin.slice(0, -1) : window.location.origin;
    return `${origin}${path}`;
  }
  return `http://localhost:5173${path}`;
}

const PROFILES_API_URL = getApiUrl('/api/profiles');
const PROGRESSION_API_URL = getApiUrl('/api/progression');
const DELETED_PROFILES_KEY = 'kp-deleted-profiles-index';

// Helper to get deleted profile IDs
function getDeletedProfileIds(): string[] {
  try {
    const raw = localStorage.getItem(DELETED_PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to add deleted profile ID
export function trackDeletedProfileId(id: string) {
  try {
    const ids = getDeletedProfileIds();
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(DELETED_PROFILES_KEY, JSON.stringify(ids));
    }
  } catch (e) {
    console.error('Failed to track deleted profile ID:', e);
  }
}

// Fetch helper with timeout
async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function syncProfiles(localProfiles: Profile[]): Promise<{
  syncedProfiles: Profile[];
  hasChanges: boolean;
}> {
  if (!navigator.onLine) {
    return { syncedProfiles: localProfiles, hasChanges: false };
  }

  try {
    const response = await fetchWithTimeout(PROFILES_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch profiles: ${response.statusText}`);
    }
    const serverProfiles: Profile[] = await response.json();

    const localMap = new Map<string, Profile>(localProfiles.map(p => [p.id, p]));
    const serverMap = new Map<string, Profile>(serverProfiles.map(p => [p.id, p]));
    const deletedIds = new Set(getDeletedProfileIds());

    const resultProfiles: Profile[] = [];
    let hasChanges = false;
    let needsUpload = false;

    // Process all profile IDs from local and server
    const allIds = new Set([...localMap.keys(), ...serverMap.keys()]);

    for (const id of allIds) {
      if (deletedIds.has(id)) {
        // Profile was deleted, ensure it is removed/not added
        if (serverMap.has(id)) {
          hasChanges = true;
          needsUpload = true;
        }
        continue;
      }

      const localProfile = localMap.get(id);
      const serverProfile = serverMap.get(id);

      if (localProfile && serverProfile) {
        const localTime = localProfile.updatedAt || 0;
        const serverTime = serverProfile.updatedAt || 0;

        if (localTime > serverTime) {
          resultProfiles.push(localProfile);
          needsUpload = true;
          hasChanges = true;
        } else if (serverTime > localTime) {
          resultProfiles.push(serverProfile);
          hasChanges = true;
        } else {
          resultProfiles.push(localProfile);
        }
      } else if (localProfile) {
        // Exists only locally
        resultProfiles.push(localProfile);
        needsUpload = true;
        hasChanges = true;
      } else if (serverProfile) {
        // Exists only on server
        resultProfiles.push(serverProfile);
        hasChanges = true;
      }
    }

    if (needsUpload) {
      const uploadResponse = await fetchWithTimeout(PROFILES_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultProfiles),
      });
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload profiles: ${uploadResponse.statusText}`);
      }
    }

    return { syncedProfiles: resultProfiles, hasChanges };
  } catch (err) {
    console.error('[SyncService] Profiles sync failed:', err);
    return { syncedProfiles: localProfiles, hasChanges: false };
  }
}

export async function syncProgression(): Promise<{ hasChanges: boolean }> {
  if (!navigator.onLine) {
    return { hasChanges: false };
  }

  try {
    const localProgressionsList = await getAllProgress();
    const response = await fetchWithTimeout(PROGRESSION_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch progression: ${response.statusText}`);
    }
    const serverProgressions: Record<string, DbProfileProgression> = await response.json();

    const localMap = new Map<string, DbProfileProgression>(
      localProgressionsList.map(p => [p.profileId, p])
    );
    const deletedIds = new Set(getDeletedProfileIds());

    const resultProgressions: Record<string, DbProfileProgression> = {};
    let hasChanges = false;
    let needsUpload = false;

    const allIds = new Set([...localMap.keys(), ...Object.keys(serverProgressions)]);

    for (const id of allIds) {
      if (deletedIds.has(id)) {
        if (serverProgressions[id]) {
          hasChanges = true;
          needsUpload = true;
        }
        // If it exists locally, clean it up
        if (localMap.has(id)) {
          await deleteProgress(id);
          hasChanges = true;
        }
        continue;
      }

      const localProg = localMap.get(id);
      const serverProg = serverProgressions[id];

      if (localProg && serverProg) {
        const localTime = localProg.updatedAt || 0;
        const serverTime = serverProg.updatedAt || 0;

        if (localTime > serverTime) {
          resultProgressions[id] = localProg;
          needsUpload = true;
          hasChanges = true;
        } else if (serverTime > localTime) {
          resultProgressions[id] = serverProg;
          await saveProgress(serverProg);
          hasChanges = true;
        } else {
          resultProgressions[id] = localProg;
        }
      } else if (localProg) {
        resultProgressions[id] = localProg;
        needsUpload = true;
        hasChanges = true;
      } else if (serverProg) {
        resultProgressions[id] = serverProg;
        await saveProgress(serverProg);
        hasChanges = true;
      }
    }

    if (needsUpload) {
      const uploadResponse = await fetchWithTimeout(PROGRESSION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultProgressions),
      });
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload progression: ${uploadResponse.statusText}`);
      }
    }

    return { hasChanges };
  } catch (err) {
    console.error('[SyncService] Progression sync failed:', err);
    return { hasChanges: false };
  }
}

// Synchronize all profiles and progressions
export async function syncAll(
  localProfiles: Profile[],
  onProfilesUpdated?: (synced: Profile[]) => void
): Promise<void> {
  const { syncedProfiles, hasChanges } = await syncProfiles(localProfiles);
  if (hasChanges && onProfilesUpdated) {
    onProfilesUpdated(syncedProfiles);
  }
  await syncProgression();
}
