# 📦 Architecture Zustand - KidPedia

Cette migration remplace l'ancien "Provider Hell" par une gestion d'état centralisée, performante et typée.

## 🏗️ Les 3 Stores Principaux

### 1. `useProfileStore` (Identité)
**Responsabilité :** Gestion des profils enfants, avatars et persistance multi-comptes.
- **État :** `profiles`, `activeProfile`, `activeProfileId`.
- **Synchronisation :** Dès que le profil change, il notifie les autres stores via `subscribe`.

### 2. `useSettingsStore` (Préférences)
**Responsabilité :** Thème, Langue et Genre.
- **Performance :** Applique les classes CSS (`.dark`, `data-gender`) directement au démarrage pour éviter les flashs visuels.
- **Internationalisation :** Fournit l'objet `labels` traduit instantanément.

### 3. `useProgressionStore` (Dynamique)
**Responsabilité :** Saisons et logique complexe des quiz.
- **Logique Métier :** Le calcul des médailles (Gold/Silver/Bronze) se fait ici.

### 4. `usePlayerStore` (Session Active)
**Responsabilité :** Vue simplifiée pour les composants d'UI.
- **État :** `playerName`, `avatar`, `xp`, `badges`.
- **Avantage :** Permet des abonnements ultra-ciblés. C'est le store à privilégier pour l'affichage simple dans les composants.

### 5. `useSafariStore` (Jeu Safari)
**Responsabilité :** Logique du jeu de plateau Mission Safari.
- **Moteur :** Gère les déplacements pas-à-pas, la résolution des cases (boost, hazard, animal) et le dé magique.
- **Données :** Piloté par `src/data/gameData.ts`.

### 6. `useQuizStore` (Évaluations)
**Responsabilité :** Gestion éphémère d'une session de quiz.
- **Logic :** Vérifie les réponses et communique avec `useProgressionStore` pour l'attribution des médailles.

## 🔄 Synchronisation Furtive (Cross-Store)

Pour éviter de polluer les composants avec des `useEffect`, les stores communiquent entre eux via des abonnements natifs Zustand (situés dans `useProfileStore.ts`) :
1. **Profil -> Settings** : Change la langue et le thème quand l'enfant change de profil.
2. **Profil -> Progression** : Charge les médailles correspondantes au nouvel ID.
3. **Profil/Progression -> Player** : Met à jour la vue simplifiée pour l'UI.

## 🚀 Bonnes Pratiques (Sélecteurs)

**❌ À NE PAS FAIRE :** (Causera des re-renders inutiles)
```tsx
const { gender, labels } = useSettingsStore(); 
```

**✅ À FAIRE :**
```tsx
const gender = useSettingsStore(state => state.gender);
const labels = useSettingsStore(state => state.labels);
```

## 🧪 Tests

Chaque store possède une méthode `.reset()`. Elle **DOIT** être appelée dans le `beforeEach` de vos tests d'intégration pour éviter les fuites d'état entre les tests.

```typescript
beforeEach(() => {
  useProfileStore.getState().reset();
  useSettingsStore.getState().reset();
  useProgressionStore.getState().reset();
});
```
