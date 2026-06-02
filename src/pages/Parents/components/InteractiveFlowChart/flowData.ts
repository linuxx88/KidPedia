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
        profile_sel["ProfileSelection\\n(Choix / Création Profil)"]:::views
        map_view["InteractiveMap\\n(Exploration thématique)"]:::views
        safari_view["SafariPage\\n(Chasse aux autocollants)"]:::views
        gifts_view["GiftsPage\\n(Boutique des cadeaux & Garde-robe)"]:::views
        topic_view["TopicDetailPage\\n(Lecture & Fiche audio)"]:::views
        quiz_view["QuizPage\\n(Défis de connaissances)"]:::views
        championship_view["ChampionshipPage\\n(Le Grand Quiz 15s)"]:::views
    end

    %% 2. COUCHE GESTION D'ÉTAT (Zustand Stores réactifs)
    subgraph StoresLayer ["🤖 GESTION D'ÉTAT & PERSISTANCE (Zustand Stores)"]
        store_profile["useProfileStore\\n(Profils des enfants & sauvegarde)"]:::stores
        store_player["usePlayerStore\\n(Évolution XP, Niveaux, Étoiles)"]:::stores
        store_progression["useProgressionStore\\n(Sujets explorés & Médailles)"]:::stores
        store_safari["useSafariStore\\n(Stickers collectés dans la nature)"]:::stores
        store_gift["useGiftStore\\n(Achat d'accessoires & familiers)"]:::stores
        store_settings["useSettingsStore\\n(Volume global, Langue fr/en, Audio)"]:::stores
        store_championship["useQuizChampionshipStore\\n(Scores locaux & minuterie)"]:::stores
    end

    %% 3. COUCHE GRAPHISMES ET COMPOSANTS UI
    subgraph UILayer ["🎨 RENDU VISUEL & EFFETS SPÉCIAUX"]
        avatar_display["AvatarDisplay\\n(Superposition de l'avatar)"]:::components
        transformed_emoji["TransformedEmoji\\n(Module modulaire à la demande)"]:::components
        audio_feedback["useAudioFeedback\\n(Bloops, tada, rugissements)"]:::hooks
        confetti_fx["canvas-confetti\\n(Effets de victoire)"]:::components
    end

    %% 4. COUCHE BASES DE DONNÉES STATIQUES
    subgraph DataLayer ["📂 FLUX DE CONTENU (Databases)"]
        db_topics["topics.ts\\n(Textes et thèmes encyclopédiques)"]:::data
        db_quizzes["quizzes.ts\\n(Questions par sujet d'apprentissage)"]:::data
        db_accessories["accessories.ts\\n(Définitions chapeaux, lunettes, familiers)"]:::data
    end

    %% --- RELATIONSHIPS & INTERACTIONS FLOWS ---

    %% Flux d'Initialisation & Profil
    main_entry --> profile_sel
    profile_sel --> store_profile
    profile_sel --> map_view
    main_entry --> championship_view

    %% Flux de Navigation Enfant
    map_view --> topic_view
    map_view --> gifts_view
    map_view --> safari_view

    %% Flux d'Apprentissage & Quiz
    topic_view --> db_topics
    topic_view --> quiz_view
    quiz_view --> db_quizzes
    
    %% Flux de Progression & Gamification
    quiz_view --> store_player
    quiz_view --> store_progression
    safari_view --> store_safari

    %% Le Grand Quiz des Champions (Mode Défi)
    championship_view --> store_championship
    championship_view --> store_profile
    championship_view --> store_progression
    championship_view --> confetti_fx
    championship_view --> audio_feedback


    %% Flux de l'Inventaire (Gifts) & Personnalisation
    gifts_view --> db_accessories
    gifts_view --> store_gift
    gifts_view --> confetti_fx
    
    %% Flux d'Affichage Dynamique de l'Avatar
    store_gift --> avatar_display
    avatar_display --> transformed_emoji
    transformed_emoji --> db_accessories

    %% Flux de Feedback Sensoriel (Audio-visuel)
    quiz_view --> confetti_fx
    quiz_view --> audio_feedback
    store_settings --> audio_feedback
    map_view --> audio_feedback
`;
