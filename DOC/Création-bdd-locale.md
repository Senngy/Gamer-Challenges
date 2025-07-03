## De façon générale
### 0. Connexion à Postgres :

```bash
psql
```
ou

```bash
psql -U #UserName
```
ou
```bash
sudo -i -u #UserName psql
```


### 1. Créer un utilisateur :

```sql
CREATE USER app_user WITH PASSWORD 'motdepasse';
```

### 2. Créer une base de données :

```sql
CREATE DATABASE app_db OWNER app_user;
```
### 3. Attribuer les droits :

```sql
GRANT ALL PRIVILEGES ON DATABASE app_db TO app_user;
```

## Dans notre cas…
```sql
CREATE USER gamer_challenges WITH PASSWORD 'gamerchallenges';
CREATE DATABASE gamer_challenges_db OWNER gamer_challenges;
GRANT ALL PRIVILEGES ON DATABASE gamer_challenges_db TO gamer_challenges;
```
