# 🚀 Commandes Git de Base

## 🛠️ Initialisation et Clonage

- **Initialiser un dépôt local :**
    ```bash
    git init
    ```

- **Cloner un dépôt distant :**
    ```bash
    git clone <url-du-dépôt>
    ```

---

## 📄 Travailler sur les Fichiers

- **Vérifier l’état du dépôt :**
    ```bash
    git status
    ```

- **Ajouter un fichier au staging :**
    ```bash
    git add <fichier>
    ```

- **Ajouter tous les fichiers modifiés :**
    ```bash
    git add .
    ```

- **Valider les changements (commit) :**
    ```bash
    git commit -m "Message du commit"
    ```

---

## 🌿 Gestion des Branches

- **Lister les branches locales :**
    ```bash
    git branch
    ```

- **Créer une nouvelle branche :**
    ```bash
    git branch <nom-de-la-branche>
    ```

- **Changer de branche :**
    ```bash
    git checkout <nom-de-la-branche>
    ```

- **Créer une branche et se positionner dessus :**
    ```bash
    git checkout -b <nom-de-la-branche>
    ```

---

## 🔀 Fusionner des Branches

- **Fusionner une branche dans la branche courante :**
    ```bash
    git merge <nom-de-la-branche-à-fusionner>
    ```

---

## 🌍 Travailler avec un Dépôt Distant

- **Voir les dépôts distants :**
    ```bash
    git remote -v
    ```

- **Envoyer les commits vers le dépôt distant :**
    ```bash
    git push origin <nom-de-la-branche>
    ```

- **Récupérer les modifications du dépôt distant :**
    ```bash
    git pull
    ```
