# Covoiturage

Ce projet a été crée dans le cadre du cours d'architecture logicielle en première année de MBA - Développeur Full Stack - MyDigitalSchool

## Stack

### Client

- React
- Typescript
- ViteJS
- Tailwind CSS
- Shadcn UI
- Ky
- Brevo

### Server

- AdonisJS
- TypeScript
- Lucid

## Get started

Créez un fichier .env à partir des fichiers .env.example présents dans les packages client et server

```bash
cp ./client/.env.example ./client/.env
```

```bash
cp ./server/.env.example ./server/.env
```

Installation des dépendances également dans les deux packages

```bash
pnpm i
```

## Lancement du server

### Une version de node > 22 est nécessaire pour AdonisJS

#### BDD

Un fichier docker compose est à disposition pour l'utilisation de la bdd PostgreSQL et le viewer PgAdmin4

```bash
docker compose up -d || docker-compose up -d
```

Commande pour lancer le server

```bash
pnpm dev
```

Commande pour appliquer les migrations sur la BDD

```bash
node ace migration:run
```

Commande pour afficher toutes les routes de l'API

```bash
node ace list:routes
```

## Lancement du client

```bash
pnpm dev
```

## Build du projet

```bash
npm build
```
