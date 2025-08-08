# 🎮 Gamer Challenges

**Gamer Challenges** est une plateforme web qui permet aux joueurs de créer, relever et partager des défis entre eux. Ce projet a été réalisé dans le cadre de notre **projet de fin de formation (Apothéose)** chez [Nom de ton centre de formation], en équipe de 4 développeurs.

## 🚀 Objectifs

- Offrir un espace communautaire pour lancer et relever des défis gamers.
- Valoriser l'implication des joueurs avec des classements dynamiques.
- Proposer une interface simple, moderne et responsive.
- Permettre l'upload d'avatars et la gestion des utilisateurs.

---

## 🛠️ Tech Stack

### Frontend
- **SvelteKit**
- TailwindCSS
- Fetch API
- Vite

### Backend
- **Node.js** + **Express**
- PostgreSQL (via Sequelize ORM)
- JWT pour l'authentification
- Multer pour l'upload d'images

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

```env
# /api/.env
DATABASE_URL=postgres://user:password@localhost:5432/gamer_challenges
JWT_SECRET=unsecretpourjwt
PORT=3000
```

### 3. 🚀 Lancer le serveur backend

```bash
cd api
npm install
npm run db:seed ou npm db:reset
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

Le système utilise des tokens JWT, stockés dans le localStorage.

Certaines routes API nécessitent un token valide dans le header. Gérer ici dans le fichier client/src/lib/api.js
```http
Authorization: Bearer <token>
```

#### 📸 Uploads

Les avatars sont stockés côté backend dans :
api/uploads/avatars

L’upload est géré avec :

multer côté backend

FormData côté client

## 👥 Équipe

Projet réalisé par une équipe de 4 développeurs dans le cadre de la formation O'clock :

👤 Thomas Brelot — Frontend / UI / Page d'accueil

👤 Sylvain Marchal — Base de données / Backend / Authentification & Users

👤 Lamine Boumhaza — Backend / Pages : à propos, contact, 

👤 Samuel Duthoit — Git Master / Product Owner / Intégration / Jeux / Défis / Participations / Likes