# 🤝 Guide de Contribution à KidPedia

Merci de vouloir contribuer à KidPedia! 🙌 Ton aide est précieuse pour rendre l'éducation accessible et amusante pour tous!

**Table des Matières:**
- [Code of Conduct](#-code-of-conduct)
- [Comment Commencer](#-comment-commencer)
- [Types de Contributions](#-types-de-contributions)
- [Processus de Contribution](#-processus-de-contribution)
- [Guide de Style](#-guide-de-style)
- [Tests](#-tests)
- [Pull Requests](#-pull-requests)
- [Rapporter des Bugs](#-rapporter-des-bugs)
- [Questions & Support](#-questions--support)

---

## 📜 Code of Conduct

Nous nous engageons à maintenir un environnement accueillant et respectueux. Consulte notre [Code of Conduct](./CODE_OF_CONDUCT.md) pour les règles de conduite.

**Résumé:**
- ✅ Sois respectueux envers tous
- ✅ Pas de harcèlement ou de discrimination
- ✅ Sois constructif dans tes critiques
- ✅ Signale les comportements inappropriés

---

## 🎯 Comment Commencer

### Prérequis
- Node.js 20+ ([Télécharger](https://nodejs.org/))
- npm 10+ (Inclus avec Node.js)
- Git ([Télécharger](https://git-scm.com/))
- Compte GitHub ([Créer](https://github.com/signup))

### Setup Développement

```bash
# 1. Fork le repository
# (Clique sur "Fork" en haut à droite de https://github.com/linuxx88/KidPedia)

# 2. Clone ton fork
git clone https://github.com/TON_USERNAME/KidPedia.git
cd KidPedia

# 3. Ajoute le repository original comme "upstream"
git remote add upstream https://github.com/linuxx88/KidPedia.git

# 4. Installe les dépendances
npm install

# 5. Lance en développement
npm run dev

# 6. Ouvre http://localhost:5173 dans ton navigateur
```

### Vérifier que tout fonctionne

```bash
# Valide tout (Lint + Types + Tests)
npm run validate

# Ou individuellement:
npm run lint       # ESLint
npm run type-check # TypeScript
npm test           # Vitest
npm run test:e2e   # Playwright
```

---

## 🎨 Types de Contributions

### 🐛 Rapporter des Bugs
- **Ouvre une [Issue](https://github.com/linuxx88/KidPedia/issues/new)** avec le label `bug`
- Fournissez des étapes claires pour reproduire
- Inclure des screenshots si applicable
- Mentionner ton environnement (OS, navigateur, Node.js version)

### ✨ Proposer des Features
- **Ouvre d'abord une [Discussion](https://github.com/linuxx88/KidPedia/discussions)** pour discuter
- Ou crée une [Issue](https://github.com/linuxx88/KidPedia/issues/new) avec le label `enhancement`
- Explique clairement pourquoi c'est utile
- Fournis des exemples d'utilisation

### 📖 Améliorer la Documentation
- Améliore les README, guides, commentaires de code
- Corrige les typos et erreurs
- Ajoute des exemples
- Contribue toujours bienvenue! ✅

### 🎨 Améliorer le Design/UX
- Propose des améliorations d'interface
- Soumets des mockups ou prototypes
- Ouvre une Discussion pour en discuter d'abord

### 🧪 Ajouter des Tests
- Augmente la couverture de tests
- Ajoute des cas de test manquants
- Améliore les tests E2E

### 🔧 Refactoring & Optimisation
- Nettoie et améliore le code existant
- Optimise les performances
- Réduit la complexité cyclomatique

### 🌍 Traductions
- Aide à traduire KidPedia dans d'autres langues
- Améliore les traductions existantes
- Ouvre une Issue pour coordonner

---

## 🚀 Processus de Contribution

### Étape 1: Prépare ta Branche

```bash
# Assure-toi d'être à jour avec la branche principale
git checkout main
git pull upstream main

# Crée une branche pour ta feature/fix
git checkout -b feature/ma-superbe-feature
# ou pour un bug:
git checkout -b fix/correction-du-bug

# Convention de nommage:
# - feature/nom-de-la-feature
# - fix/nom-du-fix
# - docs/nom-de-la-doc
# - refactor/nom-du-refactoring
# - test/nom-du-test
```

### Étape 2: Fais tes Changements

```bash
# Fais tes modifications
# (crée ou modifie les fichiers nécessaires)

# Teste régulièrement
npm run dev          # Développement
npm run validate     # Lint + Types + Tests
npm test -- --watch # Tests en mode watch
```

### Étape 3: Respecte le Guide de Style

Voir [Guide de Style](#-guide-de-style) ci-dessous.

### Étape 4: Écris des Tests

- **Tests Unitaires** - Pour la logique métier
- **Tests E2E** - Pour les user journeys importants
- Assure-toi que la couverture est bonne

```bash
npm test -- --coverage  # Voir la couverture
```

### Étape 5: Valide Ton Code

```bash
# Valide TOUT avant de commiter
npm run validate

# Doit afficher ✅ partout:
# ✅ ESLint (Lint)
# ✅ TypeScript (Type-checking)
# ✅ Vitest (Unit tests)
# ✅ Build (Vite)
```

### Étape 6: Commit avec des Messages Clairs

```bash
# Ajoute tes fichiers
git add .

# Commit avec un message descriptif
git commit -m "feat: add awesome feature"
# ou
git commit -m "fix: correct bug in feature"
# ou
git commit -m "docs: improve README"

# Convention de commit (Conventional Commits):
# - feat: new feature
# - fix: bug fix
# - docs: documentation
# - style: formatting, missing semicolons, etc
# - refactor: code refactoring
# - perf: performance improvements
# - test: adding or updating tests
# - chore: build process, dependencies, etc
```

### Étape 7: Push et Crée une Pull Request

```bash
# Push ta branche
git push origin feature/ma-superbe-feature

# Puis ouvre une Pull Request sur GitHub
# (Un lien s'affichera dans ton terminal)
```

---

## 📝 Guide de Style

### TypeScript/React

```typescript
// ✅ BIEN
// Noms explicites
const handleUserClick = () => {
  // ...
};

// Types explicites
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

// Composants fonctionnels avec types
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ À ÉVITER
// Noms génériques
const handle = () => {};

// Pas de types
const profile = {};

// Any partout
const profile: any = {};
```

### CSS/Modules

```css
/* ✅ BIEN */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: var(--primary-color);
}

.button:hover {
  background-color: var(--primary-color-hover);
}

/* ❌ À ÉVITER */
/* Styles inline excessifs */
/* Couleurs en dur (pas de variables) */
/* IDs pour le styling */
```

### Fichiers et Dossiers

```
// Convention de nommage:
// - Composants: PascalCase (Button.tsx)
// - Hooks: camelCase avec prefix "use" (useAudioFeedback.ts)
// - Types: PascalCase (UserProfile.ts)
// - Styles: kebab-case (button.module.css)
// - Utilitaires: camelCase (formatDate.ts)
```

### Commentaires

```typescript
// ✅ BIEN
// Explique le POURQUOI, pas le QUOI
/**
 * Gère les clics utilisateur avec debouncing
 * pour éviter les appels multiples
 */
const handleClick = debounce(() => {
  // ...
}, 300);

// ❌ À ÉVITER
// Commentaires inutiles
const x = 5; // set x to 5
```

### Longueur des Fichiers

- **Composants**: ~200-400 lignes max (découpe si > 400)
- **Hooks**: ~150-200 lignes max
- **Types**: ~100 lignes max
- **Utils**: ~150 lignes max

---

## 🧪 Tests

### Exigences Minimales

- **Features nouvelles**: Min 80% de coverage
- **Bug fixes**: Tests pour reproduire le bug
- **Refactoring**: Tests existants DOIVENT passer

### Écrire des Tests Unitaires

```typescript
// ✅ BIEN
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2026-05-21');
    const result = formatDate(date);
    expect(result).toBe('21/05/2026');
  });

  it('should handle invalid dates', () => {
    const result = formatDate(null);
    expect(result).toBe('');
  });
});
```

### Écrire des Tests E2E

```typescript
// ✅ BIEN
import { test, expect } from '@playwright/test';

test('should display welcome message on first visit', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const title = page.locator('h1');
  await expect(title).toContainText('Welcome to KidPedia');
});
```

### Lancer les Tests

```bash
# Tests unitaires (une fois)
npm test

# Tests unitaires (watch mode)
npm test -- --watch

# Tests E2E
npm run test:e2e

# Tests E2E avec UI
npm run test:e2e -- --ui

# Coverage
npm test -- --coverage
```

---

## 📤 Pull Requests

### Avant de Soumettre

1. ✅ **Valide ton code** - `npm run validate`
2. ✅ **Écris des tests** - Ajoute des tests pour ton code
3. ✅ **Documente tes changements** - Ajoute des commentaires/JSDoc si nécessaire
4. ✅ **Rebase si nécessaire** - Fais un rebase sur `main` pour éviter les conflits
5. ✅ **Vérifie le build** - Assure-toi que le build passe

### Template de Pull Request

```markdown
## Description
Brève description de ce que cette PR fait.

## Type de changement
- [ ] Bug fix (correction sans breaking changes)
- [ ] Nouvelle feature (sans breaking changes)
- [ ] Breaking change
- [ ] Documentation

## Comment Tester?
Étapes pour tester tes changements:
1. Fais X
2. Fais Y
3. Vérifie Z

## Checklist
- [ ] Mon code respecte le guide de style
- [ ] J'ai exécuté `npm run validate`
- [ ] J'ai ajouté des tests
- [ ] J'ai mis à jour la documentation
- [ ] Pas de warnings/erreurs dans la console

## Screenshots (si applicable)
Ajoute des screenshots pour les changements visuels.

## Références Issues
Ferme les issues liées:
- Closes #123
```

### Qu'Attendre?

- 🤖 **GitHub Actions** - Tests automatiques vont s'exécuter
- 👀 **Review** - Un mainteneur va vérifier ton code
- 💬 **Feedback** - Peut y avoir des demandes de changements
- ✅ **Merge** - Une fois approuvé, ton code sera merged!

---

## 🐛 Rapporter des Bugs

### Avant de Signaler

1. **Cherche les issues existantes** - Ton bug est peut-être déjà connu
2. **Teste sur la version latest** - Le bug est peut-être déjà corrigé
3. **Vérifie ton environnement** - Node.js, npm, navigateur à jour?

### Comment Signaler

Ouvre une [nouvelle Issue](https://github.com/linuxx88/KidPedia/issues/new) avec:

```markdown
## Description du Bug
Description claire et concise du bug.

## Étapes pour Reproduire
1. Fais X
2. Fais Y
3. Observe Z

## Résultat Attendu
Que devrait-il se passer?

## Résultat Actuel
Que s'est-il passé réellement?

## Environnement
- OS: [e.g. Windows 11, macOS 14, Ubuntu 22.04]
- Navigateur: [e.g. Chrome 120, Firefox 121]
- Node.js: [e.g. 20.10]
- npm: [e.g. 10.5]

## Screenshots/Vidéos
Ajoute des screenshots ou vidéos si applicable.

## Logs d'Erreur
Colle les erreurs console/terminal.
```

---

## 💬 Questions & Support

### Obtenir de l'Aide

- **Questions générales?** - Ouvre une [Discussion](https://github.com/linuxx88/KidPedia/discussions)
- **Documentation?** - Consulte le [README](./README.md) et les [Guides](./docs/)
- **Architecture?** - Lis le [Guide Technique](./docs/GUIDE.md)
- **Besoin d'un mentor?** - Contacte un mainteneur

### Mainteneurs

Les mainteneurs peuvent être contactés via les Issues ou Discussions.

---

## 📚 Ressources Utiles

### Apprentissage
- [Prettier Documentation](https://prettier.io/)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [React Best Practices](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Guide](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)

### Outils Recommandés
- **IDE**: [VS Code](https://code.visualstudio.com/)
- **Extensions**:
  - ESLint
  - Prettier
  - TypeScript Vue Plugin
  - Playwright Test for VSCode

---

## 🎉 Merci!

Merci de contribuer à KidPedia! 🙌

Ton aide rend l'éducation accessible et amusante pour tous les enfants! 🌍✨

---

**Besoin de clarification?** Ouvre une [Discussion](https://github.com/linuxx88/KidPedia/discussions) ou contacte les mainteneurs! 😊

*Heureux de coder!* 🚀
