# 🎮 Gamer Challenges

**Gamer Challenges** est une plateforme web qui permet aux joueurs de créer, relever et partager des défis entre eux.
Projet fullstack démontrant la conception d’une API REST sécurisée, l’intégration d’API tierces et le déploiement en production.

## 🌍 Démo en ligne

- Frontend : https://gamer-challenges.vercel.app/
- Backend API : https://gamer-challenges-production.up.railway.app
- Documentation Swagger : https://gamer-challenges-production.up.railway.app/doc

## 🚀 Objectifs

- Créer un espace communautaire pour lancer et relever des défis gamers.
- Valoriser l'implication des joueurs avec des classements dynamiques.
- Proposer une interface moderne, responsive et mobile-first
- Gestion des utilisateurs, avatars et interactions (likes, participation).

## Fonctionnalités

- Inscription / Connexion sécurisée (JWT)
- Création de défis liés à des jeux
- Participation à des défis
- Système de likes
- Classement dynamique des joueurs
- Upload d’avatar via Supabase Storage
- Catalogue de jeux synchronisé via l’API RAWG

 ## Architecture
 
- Architecture REST (API Express)
- Séparation Frontend / Backend
- ORM Sequelize avec relations SQL (Users ↔ Challenges ↔ Games)
- Validation des données avec Joi
- Gestion des erreurs centralisée
- Scripts de migration et seed automatisés

## 🔐 Sécurité

- Hash des mots de passe avec node:crypto (PBKDF2)
- Authentification JWT avec middleware de vérification
- Protection des routes privées via middleware Express
- Validation des entrées utilisateur (Joi)
  
---

## 🛠️ Tech Stack

### Frontend
- **SvelteKit**
- TailwindCSS / CSS natif
- Fetch API
- Vite

### Backend
- **Node.js** + **Express**
- PostgreSQL via Sequelize ORM
- JWT pour l'authentification
- Multer pour l'upload d'images
- Joi pour validation des données

### Déploiement
- Vercel (frontend)
- Railway (backend)
- Supabase (base de données)

### API externe

Les jeux sont synchronisés depuis l’API RAWG :
https://rawg.io/apidocs

Un script d’import permet :
- Récupération des jeux les mieux notés
- Synchronisation en base PostgreSQL
- Ajout ciblé de jeux via script dédié

---

## 📁 Structure du projet

gamer-challenges/
│
├── api/ → Backend Express
├── client/ → Frontend SvelteKit
└── README.md

## 🔧 Installation

### ⚙️ Prérequis

- Node.js >= 18
- PostgreSQL >= 14
- Git

---

### 1. Clone du projet

```bash
git clone https://github.com/votre-groupe/gamer-challenges.git
cd gamer-challenges
```

### 2. 🛠️ Configuration de la base de données

Crée une base de données PostgreSQL nommée `gamer_challenges`.

Renseigne les informations de connexion dans le fichier `.env` du dossier `api` :

#### ⚙️ Variables d’environnement

Les fichiers `.env` ne sont pas versionnés.

Un fichier `.env.example` est fourni dans les dossiers `api/` et `client/` pour indiquer les variables nécessaires.

### 3. 🚀 Lancer le serveur backend

```bash
cd api
npm install
npm run db:seed
# ou
npm run db:reset
npm run dev
```
Par défaut, l’API est accessible à l’adresse :
http://localhost:3000

### 4. 🌐 Lancer le client frontend
```bash
cd ../client
npm install
npm run dev
```
Par défaut, l’application SvelteKit est accessible à :
http://localhost:5173

#### 🔐 Authentification

Actuellement les tokens JWT sont stockés en localStorage (évolution prévue vers cookies httpOnly sécurisés).

Certaines routes API nécessitent un token valide dans le header. Gérer ici dans le fichier client/src/lib/api.js
```http
Authorization: Bearer <token>
```
## 🧠 Compétences techniques démontrées

- Conception de base de données relationnelle
- Gestion des clés étrangères et intégrité référentielle
- Consommation d’API REST tierces
- Implémentation d’authentification JWT
- Upload de fichiers sécurisé
- Déploiement Fullstack (Vercel + Railway)

## Améliorations en cours

- Passage JWT vers httpOnly cookies + refresh tokens

- Dockerisation backend + frontend

- CI/CD avec tests automatisés

- Partie Admin

- Logging structuré et monitoring

---

## 👥 Contexte & rôle

Projet réalisé en équipe de 4 développeurs dans le cadre de la formation O'clock (Apothéose).

### 🎯 Mon rôle principal :
- Architecture du front avec SvelteKit
- Conception et modélisation de la base de données PostgreSQL
- Implémentation du backend Express
- Mise en place de l’authentification JWT
- Intégration compléte de l'authentification (front & back)
- Gestion des relations SQL (Users ↔ Challenges ↔ Games ↔ Participations ↔ Likes)
- Intégration de l’API RAWG
- Déploiement backend sur Railway
- Déploiement frontend sur Vercel
- Mise en place de la base de données en production sur Supabase
- Intégration du système de like
- Implémentation des modals côté client
- Validation des données côté back et front
- Documentation Swagger

### 🤝 Travail collaboratif :
- Organisation Git en équipe
- Pull requests et revues de code
- Coordination Frontend / Backend
