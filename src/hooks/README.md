# 🪝 KidPedia - Documentation des Hooks

Ce répertoire contient la logique métier réutilisable et les intégrations API du projet.

## 🔊 useAudioFeedback

Hook centralisé pour la gestion des effets sonores (SFX) et du feedback audio.

### 🏗️ Architecture Singleton
Pour éviter les fuites mémoire (memory leaks) et la surcharge CPU sur les appareils mobiles ou anciens (type X220), ce hook utilise un **Singleton** via `useRef`.

- **Instance Unique :** Un seul objet `HTMLAudioElement` est créé pour toute la durée de vie du composant.
- **Recyclage :** À chaque appel de `playSound`, seule la source (`src`) est modifiée.
- **Garde-fou (Guard) :** Le hook vérifie l'existence de l'asset sur le disque avant de tenter de le charger, évitant ainsi les erreurs 404 dans les logs de production.

### 🛠️ Utilisation
```typescript
const { playSound } = useAudioFeedback();

// Pour un clic simple
playSound('click');

// Pour une célébration
playSound('success');
```

## 📍 useCategorySpy

Gère la détection de la catégorie active lors du défilement (ScrollSpy).

### 🚀 Optimisation
Utilise `IntersectionObserver` avec un `rootMargin` calibré à 50% de la fenêtre pour garantir une activation stable même si la section ne touche pas parfaitement le sommet de l'écran.

---

## 🛡️ Bonnes Pratiques : Sélecteurs Zustand & Stabilité

Pour éviter l'erreur `Maximum update depth exceeded`, respectez ces règles d'or dans tout le projet :

1.  **Références Stables :** Ne renvoyez jamais un nouveau tableau vide `[]` ou un nouvel objet `{}` directement dans un sélecteur. Utilisez une constante globale (ex: `EMPTY_ARRAY`) pour que React comprenne que la donnée n'a pas changé.
2.  **Pureté du Store :** Ne déclenchez jamais d'actions modifiant un *autre* store (comme les notifications) à l'intérieur d'un `set()`. Faites-le juste après l'appel à `set()`.

---

## 🎨 useVisualEffects

Gère les effets visuels éphémères (ondes, ripples) pour garantir des performances optimales (60 FPS) sans polluer le DOM sur le long terme.
