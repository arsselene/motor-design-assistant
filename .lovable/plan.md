

# MAS Dimensioning Tool — Plan d'implémentation

## Vue d'ensemble
Application web professionnelle pour le dimensionnement complet d'un moteur asynchrone triphasé à cage d'écureuil, fidèle au polycopié "Conception MAS 2026". Interface moderne avec authentification, sauvegarde cloud, et export PDF.

---

## 1. Authentification & Dashboard
- **Inscription / Connexion** via email (Supabase Auth)
- **Dashboard principal** : liste des projets sauvegardés, bouton "Nouveau calcul", résumé des résultats clés du dernier projet
- Possibilité de **dupliquer** un projet existant pour comparer des variantes

## 2. Interface de calcul — Assistant multi-étapes (Wizard)
Navigation par **barre de progression + onglets latéraux** correspondant aux 7 parties du document :

### Étape 1 — Cahier des charges & Dimensions principales
- Champs : Puissance Pn (kW), Vitesse n (tr/min), Tension V, Fréquence f (50/60 Hz)
- Auto-lookup de cos φ et η depuis le Tableau 1 intégré
- Calcul automatique : nombre de pôles (2p), vitesse synchrone, ke (interpolation Figure 1), Dint (interpolation Figure 2)
- Calcul : diamètre stator normalisé, diamètre rotor, pas polaire τ, longueur stator ls
- Affichage des courbes A et Bδ (Figure 1-3) avec valeurs interpolées
- Tableau récapitulatif des variantes (comme Tableau 1.2)

### Étape 2 — Paramètres du stator
- Choix de q1 (encoches par pôle et phase), calcul Z1, pas dentaire t1
- Courant absorbé I1n, nombre de conducteurs Nc
- Section et diamètre du conducteur (lookup Tables 2.1, 2.2)
- Dimensions des encoches, vérification coefficient KM ≤ 0.75
- Calcul du flux magnétique Φ, induction dans l'entrefer Bδ

### Étape 3 — Paramètres du rotor
- Choix du nombre d'encoches Z2 (lookup Tableau 3.1 selon 2p et Z1)
- Diamètre rotor D', pas dentaire t2
- Courant rotor I2, courant de court-circuit Icc
- Sections des barres et bagues
- Dimensions des encoches rotoriques, induction magnétique rotor

### Étape 4 — Forces magnétomotrices (FMM) & Saturation
- Coefficient d'entrefer Kδ (interpolation Figure 4.1)
- FMM de l'entrefer, des dents stator/rotor, des culasses
- Lookup Bd vs Hd (Table 4.1, courbe de magnétisation)
- Coefficient de saturation Kd, itération si nécessaire
- FMM totale, courant magnétisant Im

### Étape 5 — Résistances & Réactances
- Résistance stator r1 (longueur conducteur, conductibilité Table 5.1)
- Résistance rotor r2 et r2' ramené au stator
- Perméances magnétiques (encoches, fuites, frontale) avec courbes KB, KB'
- Réactances X1, X2, X2' et valeurs en per unit

### Étape 6 — Pertes & Poids
- Poids culasse et dents stator/rotor
- Pertes fer (culasse + dents stator, dents rotor, pulsation)
- Pertes mécaniques
- Tableau type d'acier (Table 6.1, 6.2)
- Pertes totales

### Étape 7 — Schéma équivalent & Diagramme du cercle
- Calcul C1, C2, xcc, rcc
- Pertes à vide, courant à vide I0, cos φ0
- Diamètre du cercle Dc
- **Visualisation** : schéma équivalent simplifié (SVG)
- **Visualisation** : diagramme du cercle (graphique interactif)

## 3. Fonctionnalités transversales

### Données de référence intégrées
- Tous les tableaux du polycopié encodés en JSON (Tables 1, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 6.2)
- Courbes empiriques (ke, Dint, A, Bδ, Kδ1, Kδ2, β0, KB, KB') en points de données avec interpolation linéaire/cubique

### Validation & aide
- Validation en temps réel des entrées (limites physiques raisonnables)
- Tooltips sur chaque paramètre expliquant sa signification et sa référence au document
- Possibilité de **surcharger** toute valeur intermédiaire calculée

### Export & sauvegarde
- **Sauvegarde cloud** automatique (Supabase database)
- **Export PDF** : rapport complet avec tous les résultats, formules et tableaux
- **Export JSON** : données brutes du projet

### Interface
- Thème clair/sombre
- Toggle **Français / English**
- Design moderne avec icônes Lucide, typographie claire, cartes organisées
- Barre de progression du wizard
- Tableaux de résultats formatés avec unités

## 4. Architecture technique
- **Frontend** : React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend** : Supabase (auth + base de données pour projets)
- **Calculs** : module TypeScript dédié avec commentaires référençant les pages du document
- **Graphiques** : Recharts pour les diagrammes, SVG pour le schéma équivalent
- **PDF** : génération côté client

