

````markdown
# 📚 Projet - Maîtrise d’une API REST (Bibliothèque Numérique)

Ce projet a été réalisé dans le cadre du module "Maîtrise d’une API REST". Il s'agit d'une solution complète (**Backend NestJS** + **Frontend React**) permettant de gérer une bibliothèque numérique (Livres, Auteurs, Catégories).

---

## 🚀 Fonctionnalités

Le projet respecte les contraintes techniques imposées et propose :

* **CRUD Complet** : Gestion des Livres, Auteurs et Catégories.
* **Frontend Interactif** : Interface utilisateur complète avec formulaires et gestion de **Connexion / Déconnexion**.
* **Authentification & Rôles** :
    * Authentification par **JWT** (Bearer Token) avec session persistante.
    * Gestion des rôles : **Admin** (Accès total : Création/Suppression) vs **User** (Lecture seule).
* **Sécurité** :
    * **Rate Limiting** : Protection contre le spam via `@nestjs/throttler` (10 requêtes/min).
    * **Bcrypt** : Hashage sécurisé des mots de passe.
    * **Guards** : Protection des routes sensibles.
* **Documentation API** : Interface **Swagger UI** intégrée.
* **Base de Données** : PostgreSQL hébergée dans le cloud (Vercel/Neon).

---

## 🛠️ Prérequis

* **Node.js** (v18 ou supérieur)
* **npm**

---

## ⚙️ Installation & Configuration

Suivez ces étapes scrupuleusement pour lancer le projet.

### 1. Installation des dépendances

Ouvrez un terminal à la racine du projet et installez les dépendances pour les deux parties :

**Backend :**
```bash
cd backend
npm install
````

**Frontend :**

```bash
cd ../frontend
npm install
```

### 2\. Configuration de l'environnement (.env)

Le projet utilise une base de données PostgreSQL hébergée. Pour des raisons de sécurité, le fichier `.env` n'est pas inclus. **Vous devez le créer manuellement.**

1.  Allez dans le dossier `backend`.
2.  Créez un fichier nommé `.env`.
3.  Copiez le contenu exact ci-dessous (il contient les accès à la base de données de production dédiée à l'évaluation) :

<!-- end list -->

```env
# --- Base de Données (Neon/Vercel) ---
POSTGRES_PRISMA_URL="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna-pooler.eu-west-2.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna.eu-west-2.aws.neon.tech/neondb?sslmode=require"
DATABASE_URL="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna-pooler.eu-west-2.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"

# --- Sécurité ---
# Définissez votre propre phrase secrète ici pour la signature des tokens
JWT_SECRET="UnePhraseSecreteTresLongueEtSecuriseePourLeProjet"
```

### 3\. Initialisation de la Base de Données

Une fois le fichier `.env` créé, lancez les commandes suivantes dans le dossier `backend` pour créer les tables et injecter les données :

```bash
# 1. Génère le client Prisma
npx prisma generate

# 2. Synchronise le schéma (Crée les tables dans la BDD)
npx prisma db push

# 3. Remplit la base avec les utilisateurs de test
npx prisma db seed
```

> **Note :** Le script `seed.ts` va créer les comptes **Admin** et **User** nécessaires pour tester l'application.

-----

## ▶️ Démarrage

Il faut lancer deux terminaux séparés.

**Terminal 1 (Backend) :**

```bash
cd backend
npm run start:dev
```

> API : `http://localhost:3000`

**Terminal 2 (Frontend) :**

```bash
cd frontend
npm run dev
```

> Site Web : `http://localhost:5173`

-----

## 🧪 Comptes de Test

Utilisez ces identifiants (générés par le seed) pour tester l'application :

| Rôle | Email | Mot de passe | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` | Créer, Modifier, Supprimer |
| **User** | `user@example.com` | `user123` | Lecture seule |

-----

## 📖 Documentation & Accès

  * **Application Web** : [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
  * **Documentation Swagger** : [http://localhost:3000/api](https://www.google.com/search?q=http://localhost:3000/api)

<!-- end list -->

```
```