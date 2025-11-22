# Reglo - Comparateur de Prix

Reglo est une application web qui permet de comparer les prix de produits alimentaires entre différents magasins (Carrefour, Lidl, Monoprix, Auchan, E.Leclerc).

## Fonctionnalités

- **Sélection de produits** : Parcourez et sélectionnez vos produits par catégorie (Pâtes, Café, Chocolat, Boissons, etc.)
- **Comparaison par magasin** : Visualisez les prix de vos produits sélectionnés dans chaque magasin
- **Meilleur prix identifié** : Le magasin le moins cher est mis en avant, avec les économies potentielles
- **Produits les moins chers** : Pour chaque produit, le prix le plus bas est identifié
- **API Backend** : Récupération des prix depuis une base de données SQLite
- **Intégration Open Food Facts** : Recherche de produits par code-barres
- **Scrapers** : Architecture prête pour le scraping des drives (Carrefour, Auchan, Monoprix)

## Stack Technique

### Frontend
- **Next.js 16** - Framework React avec App Router
- **React 19** - UI Library
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion** - Animations fluides

### Backend
- **Node.js + Express** - API REST
- **SQLite (better-sqlite3)** - Base de données
- **Cheerio** - Web scraping
- **Axios** - Requêtes HTTP

## Installation

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
npm install
npm run db:seed  # Initialise la base de données avec des données de test
```

## Développement

### Lancer le backend (port 3001)
```bash
cd backend
npm run start
```

### Lancer le frontend (port 3000)
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Liste tous les produits |
| GET | `/api/products/:id` | Détails d'un produit avec ses prix |
| GET | `/api/products/barcode/:barcode` | Recherche par code-barres |
| GET | `/api/stores` | Liste tous les magasins |
| GET | `/api/prices/compare?productIds=id1,id2` | Compare les prix pour une liste de produits |
| POST | `/api/products/search/openfoodfacts` | Recherche sur Open Food Facts |

## Structure du projet

```
├── src/                    # Frontend Next.js
│   ├── app/               # Pages (App Router)
│   ├── components/        # Composants React
│   ├── hooks/             # Hooks personnalisés
│   ├── services/          # Services API
│   └── types/             # Types TypeScript
│
└── backend/               # Backend Node.js
    └── src/
        ├── routes/        # Routes API
        ├── services/      # Services (Open Food Facts)
        ├── scrapers/      # Scrapers pour les drives
        └── db/            # Configuration base de données
```

## Sources de données

### Prix simulés (actuellement)
Les prix sont initialisés via le seed avec des données réalistes basées sur les prix observés en France (2024-2025).

### Scraping (à activer)
Le backend inclut des scrapers pour :
- Carrefour.fr
- Auchan.fr
- Monoprix.fr

Pour lancer le scraping :
```bash
cd backend
npm run scrape
```

### Open Food Facts
L'API Open Food Facts est intégrée pour :
- Recherche de produits par terme
- Récupération par code-barres
- Informations nutritionnelles
