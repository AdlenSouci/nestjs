# 📚 Projet - Maîtrise d’une API REST (Bibliothèque Numérique)

Ce projet a été réalisé dans le cadre du module "Maîtrise d’une API REST". Il s'agit d'une solution complète (**Backend NestJS** + **Frontend React**) permettant de gérer une bibliothèque numérique (Livres, Auteurs, Catégories).

---

## 🔗 Liens de Démonstration (En Ligne)

Le projet est déployé et accessible publiquement sans installation :

* 👉 **Site Web (Frontend)** : [https://nestjs-opal-zeta.vercel.app/](https://nestjs-opal-zeta.vercel.app/)
* 👉 **API & Swagger (Backend)** : [https://book-app-4vgb.onrender.com/api](https://book-app-4vgb.onrender.com/api)

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

## 🌍 Architecture Hybride (Local & Production)

Pour faciliter la correction et le test du projet, le code a été configuré pour fonctionner automatiquement dans deux environnements **sans aucune modification manuelle** de votre part.

### 1. Côté Frontend (`api.ts`)
Le client React détecte automatiquement l'environnement via `import.meta.env.MODE` :
* **En Local** (`npm run dev`) : L'application pointe vers `http://localhost:3000`.
* **En Production** (Vercel) : L'application pointe vers l'API déployée sur Render.

### 2. Côté Backend (`main.ts`)
Le serveur NestJS a été configuré pour accepter les requêtes CORS provenant de deux origines :
* `http://localhost:5173` (Pour vos tests en local).
* `https://nestjs-opal-zeta.vercel.app` (Pour l'application en ligne).

---

## 🛠️ Prérequis (Pour test local)

* **Node.js** (v18 ou supérieur)
* **npm**

---

## ⚙️ Installation & Configuration

Suivez ces étapes scrupuleusement pour lancer le projet en local.

### 1. Installation des dépendances

Ouvrez un terminal à la racine du projet et installez les dépendances pour les deux parties :

**Backend :**
```bash
cd backend
npm install
Frontend :Bashcd ../frontend
npm install
2. Configuration de l'environnement (.env)Le projet utilise une base de données PostgreSQL hébergée. Pour des raisons de sécurité, le fichier .env n'est pas inclus. Vous devez le créer manuellement.Allez dans le dossier backend.Créez un fichier nommé .env.Copiez le contenu exact ci-dessous (il contient les accès à la base de données de production dédiée à l'évaluation) :Extrait de code# --- Base de Données (Neon/Vercel) ---
POSTGRES_PRISMA_URL="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna-pooler.eu-west-2.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna.eu-west-2.aws.neon.tech/neondb?sslmode=require"
DATABASE_URL="postgresql://neondb_owner:npg_7LQCMRvEnXH4@ep-calm-morning-ab5v3cna-pooler.eu-west-2.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"

# --- Sécurité ---
# Définissez votre propre phrase secrète ici pour la signature des tokens
JWT_SECRET="UnePhraseSecreteTresLongueEtSecuriseePourLeProjet"
3. Initialisation de la Base de DonnéesUne fois le fichier .env créé, lancez les commandes suivantes dans le dossier backend pour créer les tables et injecter les données :Bash# 1. Génère le client Prisma
npx prisma generate

# 2. Synchronise le schéma (Crée les tables dans la BDD)
npx prisma db push

# 3. Remplit la base avec les utilisateurs de test
npx prisma db seed
Note : Le script seed.ts va créer les comptes Admin et User nécessaires pour tester l'application.▶️ Démarrage LocalIl faut lancer deux terminaux séparés.Terminal 1 (Backend) :Bashcd backend
npm run start:dev
API : http://localhost:3000Terminal 2 (Frontend) :Bashcd frontend
npm run dev
Site Web : http://localhost:5173🧪 Comptes de TestUtilisez ces identifiants (générés par le seed) pour tester l'application :RôleEmailMot de passePermissionsAdminadmin@example.comadmin123Créer, Modifier, SupprimerUseruser@example.comuser123Lecture seule📖 Documentation APIUne fois le projet lancé, la documentation est accessible :En Local : http://localhost:3000/apiEn Ligne : https://book-app-4vgb.onrender.com/api