# 🌍 KidPedia - Encyclopédie Interactive pour Enfants

<div align="center">

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)

**Une expérience d'apprentissage ludique et interactive conçue pour les enfants** 🎓✨

[🌐 Visiter le site](#-lancement-rapide) • [📖 Documentation](#-documentation) • [🤝 Contribuer](#-contribuer) • [📜 License](#-license)

</div>

---

## ���� À Propos

**KidPedia** est une encyclopédie interactive qui transforme l'apprentissage en aventure! 🚀

Conçue spécifiquement pour les enfants, KidPedia propose:
- 🎮 **Jeux éducatifs** interactifs (Quizzes, Mission Safari)
- 🌟 **Système de progression** avec badges et XP
- 🎨 **Interface colorée et intuitive** adaptée aux enfants
- 🌐 **Apprentissage multilingue** (Support de plusieurs langues)
- 👥 **Profils multiples** pour gérer plusieurs enfants
- 🎵 **Feedback audio et visuel** pour une meilleure expérience
- 📱 **Responsive design** (Desktop, Tablette, Mobile)

### 🎯 Objectif

Rendre l'apprentissage **amusant**, **accessible** et **gratuit** pour tous les enfants! 🌈

---

## ✨ Fonctionnalités Principales

| Fonctionnalité | Description |
|---|---|
| 🎮 **Quizzes Interactifs** | Questions engageantes avec feedback immédiat |
| 🎫 **Économie & Boutique** | Gain de tickets par médaille (Or/Argent/Bronze) pour acheter des accessoires |
| 🏆 **Mission Safari** | Jeu de plateau éducatif avec énigmes |
| 👨‍👩‍👧‍👦 **Multi-Profils** | Gérer plusieurs enfants avec leurs progressions et contrôle parental |
| 🎨 **Thème Personnalisable** | Mode clair/sombre, accessoires d'avatar à porter |
| 📊 **Système de Progression** | Badges, XP, historique des apprentissages |
| 🔊 **Retours Auditifs** | Sons de réussite et synthèse vocale immersive |
| 🌍 **Multilingue** | Plusieurs langues disponibles |
| 📱 **PWA & Offline** | Mode hors-ligne résilient et installation mobile |

---

## 🛠️ Stack Technologique

### Frontend
- **[React 18](https://react.dev/)** - UI Reactive
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type Safety
- **[Zustand](https://github.com/pmndrs/zustand)** - State Management
- **[Vite 5](https://vitejs.dev/)** - Build Tool (Lightning Fast ⚡)
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Scoped Styling

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Unit Testing
- **[Playwright](https://playwright.dev/)** - E2E Testing
- **[ESLint](https://eslint.org/)** - Code Linting
- **[TypeScript](https://www.typescriptlang.org/)** - Static Type Checking

### Tools & Infrastructure
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD Pipeline
- **[Node.js 20](https://nodejs.org/)** - Runtime
- **[npm](https://www.npmjs.com/)** - Package Manager

---

## 🚀 Lancement Rapide

### Prérequis
- Node.js 20+ ([Télécharger](https://nodejs.org/))
- npm 10+ (Inclus avec Node.js)
- Git ([Télécharger](https://git-scm.com/))

### Installation

```bash
# 1. Clone le repository
git clone https://github.com/linuxx88/KidPedia.git
cd KidPedia

# 2. Installe les dépendances
npm install

# 3. Lance en mode développement
npm run dev

# 4. Ouvre ton navigateur
# → http://localhost:5173 🎉
```

---

## 📖 Scripts Disponibles

```bash
# 🚀 Mode développement (Hot Reload)
npm run dev

# 🏗️ Build pour production
npm run build

# 📦 Preview du build production
npm run preview

# ✅ Valider tout (Lint + Types + Tests)
npm run validate

# 🧹 ESLint uniquement
npm run lint

# 📝 Type-checking TypeScript
npm run type-check

# 🧪 Tests unitaires (Vitest)
npm test

# 🎭 Tests unitaires avec Watch Mode
npm test -- --watch

# 🎯 Tests E2E (Playwright)
npm run test:e2e

# 🎯 Tests E2E avec UI
npm run test:e2e -- --ui

# 📊 Coverage des tests
npm test -- --coverage
```

---

## 📚 Documentation

### 📖 Documentation Technique
La documentation complète du projet se trouve dans le dossier `/docs`:

- **[Guide & Référence Technique](./docs/GUIDE.md)** - Vision, architecture, règles de développement
- **[Historique des Versions](./docs/HISTORY.md)** - Changelog complet et évolution du projet
- **[Documentation des Hooks](./src/hooks/README.md)** - Logique métier réutilisable
- **[Architecture Zustand](./src/store/README.md)** - Gestion d'état

### 🏗️ Structure du Projet

```
KidPedia/
├── src/
│   ├── components/        # 🧩 Composants React réutilisables
│   ├── hooks/            # 🪝 Custom hooks (Audio, ScrollSpy, Effects)
│   ├── store/            # 📦 Zustand stores (State Management)
│   ├── data/             # 📊 Données statiques (Contenu, jeux)
│   ├── styles/           # 🎨 CSS Modules globaux
│   ├── types/            # 📝 TypeScript types
│   ├── utils/            # 🔧 Utilitaires et helpers
│   └── App.tsx           # 📱 Composant racine
├── public/               # 📦 Assets statiques
├── docs/                 # 📖 Documentation
├── .github/
│   └── workflows/        # ⚙️ CI/CD Pipelines
├── vite.config.ts        # ⚡ Configuration Vite
├── vitest.config.ts      # 🧪 Configuration Vitest
├── playwright.config.ts  # 🎭 Configuration Playwright
└── tsconfig.json         # 📝 Configuration TypeScript
```

---

## 🎮 Comment Utiliser KidPedia

### Pour les Enfants 👨‍🎓
1. **Crée un profil** avec ton nom et avatar préféré
2. **Explore les thèmes** disponibles
3. **Joue aux quizzes** et gagne de l'XP 🌟
4. **Débloque des badges** en complétant les défis
5. **Participe à Mission Safari** pour apprendre en s'amusant

### Pour les Parents/Éducateurs 👨‍🏫
1. **Créez des profils** pour chaque enfant
2. **Suivez la progression** avec le système de badges
3. **Personnalisez l'expérience** (langue, thème)
4. **Consultez les stats** pour voir les apprentissages

---

## 🤝 Contribuer

Nous adorerions tes contributions! 🙌

### Avant de Commencer
- Lis notre [Guide de Contribution](./CONTRIBUTING.md)
- Consulte le [Code of Conduct](./CODE_OF_CONDUCT.md)
- Jette un œil aux [Issues Ouvertes](https://github.com/linuxx88/KidPedia/issues)

### Processus de Contribution

```bash
# 1. Fork le repository
# (Clique sur "Fork" en haut à droite)

# 2. Clone ton fork
git clone https://github.com/TON_USERNAME/KidPedia.git
cd KidPedia

# 3. Crée une branche
git checkout -b feature/ma-superbe-feature

# 4. Fais tes changements et teste
npm run validate    # Lance tous les tests
npm test -- --watch # Tests en mode watch

# 5. Commit avec un message clair
git commit -m "feat: add awesome feature"

# 6. Push et ouvre une Pull Request
git push origin feature/ma-superbe-feature
```

### 💡 Types de Contributions
- 🐛 **Rapporter des bugs** - Ouvre une issue
- ✨ **Nouvelles features** - Discute d'abord dans une issue
- 📖 **Améliorer la documentation** - Toujours bienvenu!
- 🎨 **Design/UX** - Améliore l'interface
- 🧪 **Tests** - Augmente la couverture de tests
- 🔧 **Refactoring** - Nettoie et optimise le code

---

## 🧪 Tester le Projet

### Tests Unitaires
```bash
npm test              # Exécute une fois
npm test -- --watch  # Mode watch
```

### Tests E2E
```bash
npm run test:e2e      # Headless
npm run test:e2e -- --ui  # Avec interface graphique
```

### Coverage
```bash
npm test -- --coverage
```

### CI/CD Automatique
Chaque `push` et `pull request` déclenche automatiquement:
- ✅ ESLint (code quality)
- ✅ Type checking (TypeScript)
- ✅ Unit tests (Vitest)
- ✅ E2E tests (Playwright)
- ✅ Build (Vite)

---

## 🚨 Signaler un Bug

Vous avez trouvé un bug? 🐛 Aidez-nous à l'améliorer!

Ouvre une [nouvelle issue](https://github.com/linuxx88/KidPedia/issues/new) avec:
- **Description claire** du problème
- **Étapes pour reproduire** le bug
- **Résultat attendu** vs **résultat actuel**
- **Environnement** (OS, navigateur, version Node.js)
- **Screenshots** si applicable

---

## 📊 Statistiques du Projet

- 📦 **Dépendances**: Vérifiées et à jour via [Dependabot](https://dependabot.com/)
- 🧪 **Coverage**: Tests automatiques à chaque commit
- 🔒 **Type Safety**: 100% TypeScript
- ⚡ **Performance**: Build ultra-rapide avec Vite
- 🛡️ **Sécurité**: CC BY-NC-SA 4.0 License (Non-commercial)

---

## 📋 Roadmap

### ✅ Complété
- [x] Architecture Zustand (State Management)
- [x] Système de Quizzes & Économie de Tickets (Ticket #55)
- [x] Boutique d'Accessoires d'Avatar & Compagnons Animaux (Ticket #55)
- [x] Mission Safari (Jeu de plateau ludique et interactif)
- [x] Multi-profiles & Contrôle Parental bilingue (Multiplication de sécurité)
- [x] Progressive Web App (PWA) & Mode Hors-ligne résilient (Ticket #29)
- [x] GitHub Actions (CI/CD)
- [x] Tests de couverture (100% de réussite avec 147 tests unitaires et d'intégration)

### 🚧 En cours
- [ ] Intégration Backend API
- [ ] Éditeur de contenu (Admin panel)
- [ ] Partenariats éducatifs

### 📅 Prévu
- [ ] Mode Multijoueur éducatif
- [ ] Tableau de bord statistique parents détaillé (Analytics)

---

## 👥 Contributeurs

Merci à tous nos contributeurs! 🙌

<a href="https://github.com/linuxx88/KidPedia/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=linuxx88/KidPedia" />
</a>

---

## 📜 License

Ce projet est sous la licence **[CC BY-NC-SA 4.0](LICENSE)** ⚖️

**En résumé:**
- ✅ Gratuit pour utilisation personnelle et éducative
- ✅ Permis de modifier et adapter
- ✅ Doit rester non-commercial
- ✅ Doit rester sous la même licence
- ✅ Attribution obligatoire

Pour plus de détails, consultez le fichier [LICENSE](LICENSE).

---

## 💬 Support & Questions

- **Besoin d'aide?** - Ouvre une [Discussion](https://github.com/linuxx88/KidPedia/discussions)
- **Signaler un bug?** - Crée une [Issue](https://github.com/linuxx88/KidPedia/issues)
- **Idée de feature?** - Partage-la dans les [Discussions](https://github.com/linuxx88/KidPedia/discussions)

---

## 🙏 Remerciements

KidPedia est construit avec ❤️ pour rendre l'éducation accessible et amusante pour tous les enfants!

Merci à:
- La communauté React ⚛️
- Le projet Zustand 📦
- Les contributeurs 🤝
- Et à tous ceux qui croient à l'éducation gratuite! 🌍

---

<div align="center">

**Faites des enfants heureux en apprenant!** 🌈✨

[⭐ Star le projet](#) • [🐛 Reporter un bug](#) • [💡 Partager une idée](#)

</div>

---

*Dernière mise à jour: 22 mai 2026*
