# 🐘 Installer PostgreSQL en local sur macOS (avec Homebrew)

Ce document décrit comment installer **Homebrew** et **PostgreSQL** en local sur macOS. Il s'adresse aux développeurs qui partent de zéro, pour mettre en place un environnement PostgreSQL utilisable en local.

---

## 📋 Sommaire

2. [Installation de Homebrew](#installation-de-homebrew)
3. [Installation de PostgreSQL](#installation-de-postgresql)
4. [Initialisation de la base de données](#initialisation-de-la-base-de-données)
5. [Commandes utiles](#commandes-utiles)
6. [Vérification et dépannage](#vérification-et-dépannage)
7. [Configuration d’un utilisateur PostgreSQL pour une application](#configuration-dun-utilisateur-postgresql-pour-une-application)


---

## 🍺 Installation de Homebrew

### Étape 1 : Installer Homebrew

Ouvre le Terminal et exécute :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Une fois terminé, vérifie l’installation :

```bash
brew --version
```

---

## 🐘 Installation de PostgreSQL

### Étape 2 : Installer PostgreSQL via Homebrew

```bash
brew install postgresql
```

Cela installe la dernière version stable (par exemple `postgresql@16`).

### Étape 3 : Lancer PostgreSQL automatiquement au démarrage

```bash
brew services start postgresql
```

Pour démarrer manuellement si tu préfères :

```bash
pg_ctl -D /opt/homebrew/var/postgresql@16 start
```

> Remplace `@16` par la version installée si différente.

---

## 🏗️ Initialisation de la base de données

### Étape 4 : Créer un rôle PostgreSQL lié à ton utilisateur macOS

```bash
createuser -s $(whoami)
```

### Étape 5 : Créer une base de données au même nom

```bash
createdb $(whoami)
```

### Étape 6 : Tester la connexion

```bash
psql
```

Tu devrais voir un prompt PostgreSQL comme :

```
nom_utilisateur=#
```

Pour quitter : `\q`

---

## 🧰 Commandes utiles

| Action                   | Commande                           |
| ------------------------ | ---------------------------------- |
| Lister les bases         | `psql -l`                          |
| Lister les rôles         | `psql -c '\du'`                    |
| Créer une base           | `createdb nom_base`                |
| Supprimer une base       | `dropdb nom_base`                  |
| Créer un utilisateur     | `createuser nom_utilisateur`       |
| Supprimer un utilisateur | `dropuser nom_utilisateur`         |
| Connexion à une base     | `psql -d nom_base`                 |
| Redémarrer PostgreSQL    | `brew services restart postgresql` |
| Arrêter PostgreSQL       | `brew services stop postgresql`    |
| Statut du service        | `brew services list`               |

---

## 🔍 Vérification et dépannage

### Vérifier que PostgreSQL tourne :

```bash
pg_isready
```

### Réinitialiser PostgreSQL (⚠️ supprime les données) :

```bash
brew services stop postgresql
rm -rf /opt/homebrew/var/postgres
initdb /opt/homebrew/var/postgres
brew services start postgresql
```

---

## 👤 Configuration d’un utilisateur PostgreSQL pour une application

### 1. Lancer `psql` :

```bash
psql
```

### 2. Exécuter les commandes SQL suivantes :

```sql
CREATE USER app_user WITH PASSWORD 'motdepasse';
CREATE DATABASE app_db OWNER app_user;
GRANT ALL PRIVILEGES ON DATABASE app_db TO app_user;
```
