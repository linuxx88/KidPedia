export const PROJECT_FLOW_CHART = `%%{init: {"flowchart": {"htmlLabels": false}}}%%
flowchart TB
    %% Déclarations de styles visuels
    classDef entry fill:#FFF3E0,stroke:#FFB74D,stroke-width:2px,color:#1A202C
    classDef views fill:#E8F5E9,stroke:#81C784,stroke-width:2px,color:#1A202C
    classDef components fill:#E0F7FA,stroke:#4DD0E1,stroke-width:2px,color:#1A202C
    classDef stores fill:#FFFDE7,stroke:#FFF176,stroke-width:2px,color:#1A202C
    classDef data fill:#ECEFF1,stroke:#90A4AE,stroke-width:2px,color:#1A202C
    classDef hooks fill:#F3E5F5,stroke:#BA68C8,stroke-width:2px,color:#1A202C

    %% 1. COUCHE VIEWS & ROUTING (Pages principales)
    subgraph ViewsLayer ["🎬 ENTRÉE, VUES & NAVIGATION"]
        main_entry["main.tsx / App.tsx\\n(Point d'entrée & Router)"]:::entry
        profile_sel["ProfileSelection\\n(Choix/Création Profil)"]:::views
        home_view["HomePage\\n(Accueil de l'application)"]:::views
        map_view["TreasureMap\\n(Carte interactive des secrets)"]:::views
        safari_view["MissionSafari\\n(Chasse aux autocollants)"]:::views
        gifts_view["GiftsPage\\n(Boutique des cadeaux & Garde-robe)"]:::views
        topic_view["TopicPage\\n(Lecture & Fiche audio)"]:::views
        championship_view["ChampionshipPage\\n(Le Grand Quiz 15s)"]:::views
        dictionary_view["DictionaryPage\\n(Définitions & Glossaire)"]:::views
        origins_view["OriginsLayout\\n(Frise des Origines du Temps)"]:::views
        badges_view["BadgesPage\\n(Visualisation des trophées)"]:::views
        gallery_view["ExplorerGallery\\n(Galerie des autocollants)"]:::views
        parents_dashboard["ParentsDashboard\\n(Zone Parents sécurisée)"]:::views
        flow_dashboard["FlowDashboard\\n(Cartographie interactive)"]:::views
        content_editor["ContentEditor\\n(Édition des sujets)"]:::views
    end

    %% 2. COUCHE GESTION D'ÉTAT (Zustand Stores réactifs)
    subgraph StoresLayer ["🤖 GESTION D'ÉTAT & PERSISTANCE (Zustand Stores)"]
        store_profile["useProfileStore\\n(Profils, persistance & actions)"]:::stores
        store_player["usePlayerStore\\n(XP, Niveaux & Étoiles)"]:::stores
        store_progression["useProgressionStore\\n(Noyau XP et Badges)"]:::stores
        store_safari["useSafariStore\\n(Stickers collectés)"]:::stores
        store_gift["useGiftStore\\n(Achat d'accessoires & familiers)"]:::stores
        store_settings["useSettingsStore\\n(Volume, Langue & Thème)"]:::stores
        store_championship["useQuizChampionshipStore\\n(Scores locaux & minuterie)"]:::stores
        store_discovery["useDiscoveryStore\\n(Découvertes quotidiennes)"]:::stores
        store_env["useEnvironmentStore\\n(Saisons & World State)"]:::stores
        store_notif["useNotificationStore\\n(Gestion des Toasts)"]:::stores
        store_quiz["useQuizStore\\n(État local du quiz)"]:::stores
    end

    %% 3. COUCHE GRAPHISMES ET COMPOSANTS UI
    subgraph UILayer ["🎨 RENDU VISUEL & EFFETS SPÉCIAUX"]
        avatar_display["AvatarDisplay\\n(Superposition de l'avatar)"]:::components
        transformed_emoji["TransformedEmoji\\n(Composant modulaire)"]:::components
        storyteller_btn["StorytellerButton\\n(Bouton Hibou de narration)"]:::components
        confetti_fx["canvas-confetti\\n(Effets de victoire)"]:::components
        svg_hotspot["AccessibleSvgHotspot\\n(Zones SVG accessibles)"]:::components
    end

    %% 4. COUCHE GRAPHISMES ET COMPOSANTS UI / HOOKS (Logique métier isolée)
    subgraph HooksLayer ["⚙️ HOOKS DE LOGIQUE MÉTIER"]
        audio_feedback["useAudioFeedback\\n(Sons et routage audio)"]:::hooks
        storyteller_hook["useStoryteller\\n(Gestionnaire de narration)"]:::hooks
        reader_voice["useReaderVoice\\n(Baguette de lecture assistée)"]:::hooks
        map_zoom["useMapZoom / useMapGestures\\n(Navigation spatiale)"]:::hooks
        safari_game["useSafariGame\\n(Règles de capture safari)"]:::hooks
        offline_avail["useOfflineAvailability\\n(Statut de cache PWA)"]:::hooks
    end

    %% 5. COUCHE BASES DE DONNÉES & INTEGRATION DEXIE
    subgraph DataLayer ["📂 FLUX DE CONTENU & STOCKAGE (Data)"]
        db_topics["topics.ts\\n(Contenu encyclopédique)"]:::data
        db_quizzes["quizzes.ts\\n(Questions d'apprentissage)"]:::data
        db_accessories["accessories.ts\\n(Définitions chapeaux/familiers)"]:::data
        db_map["mapData.ts\\n(Coordonnées de la carte)"]:::data
        db_dexie["KidPediaDexieDB (IndexedDB)\\n(progression, keyval, topics)"]:::data
    end

    %% --- RELATIONSHIPS & INTERACTIONS FLOWS ---

    %% Flux d'Initialisation & Migration
    main_entry --> db_dexie
    main_entry --> profile_sel
    profile_sel --> store_profile
    profile_sel --> home_view
    
    %% Flux de Navigation de l'Accueil
    home_view --> map_view
    home_view --> gifts_view
    home_view --> safari_view
    home_view --> dictionary_view
    home_view --> origins_view
    home_view --> badges_view
    home_view --> gallery_view
    home_view --> parents_dashboard

    %% Zone Parents
    parents_dashboard --> flow_dashboard
    parents_dashboard --> content_editor
    content_editor --> db_dexie

    %% Dépendances de la Carte
    map_view --> db_map
    map_view --> map_zoom
    map_view --> topic_view

    %% Flux d'Apprentissage & Narration
    topic_view --> db_topics
    topic_view --> storyteller_btn
    storyteller_btn --> storyteller_hook
    topic_view --> reader_voice
    topic_view --> store_quiz

    %% Flux de Progression & Gamification
    store_quiz --> store_player
    store_quiz --> store_progression
    store_progression --> db_dexie
    store_profile --> db_dexie
    safari_view --> safari_game
    safari_game --> store_safari

    %% Flux de l'Inventaire (Gifts) & Personnalisation
    gifts_view --> db_accessories
    gifts_view --> store_gift
    store_gift --> avatar_display
    avatar_display --> transformed_emoji
    transformed_emoji --> db_accessories

    %% Flux Audio-Visuel (Feedback & PWA)
    store_quiz --> confetti_fx
    store_quiz --> audio_feedback
    storyteller_hook --> audio_feedback
    store_settings --> audio_feedback
    main_entry --> offline_avail
`;
