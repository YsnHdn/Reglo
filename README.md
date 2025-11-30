# Reglo 🇲🇦 - Comparateur de Prix au Maroc

Reglo est une application web qui permet de comparer les prix de produits alimentaires entre différents magasins au Maroc.

## 🏪 Magasins Marocains

- **Marjane** - www.marjane.ma
- **Marjane Mall** - www.marjanemall.ma
- **Aswak Assalam** - aswakassalam.com
- **Carrefour Maroc** - www.carrefour.ma
- **Acima** - www.acima.ma

## 💰 Devise

Tous les prix sont en **MAD (Dirham marocain)**

## ✨ Fonctionnalités

- **Sélection de produits** : Parcourez et sélectionnez vos produits par catégorie (Pâtes, Café, Chocolat, Boissons, etc.)
- **Comparaison par magasin** : Visualisez les prix de vos produits sélectionnés dans chaque magasin
- **Meilleur prix identifié** : Le magasin le moins cher est mis en avant, avec les économies potentielles
- **Produits les moins chers** : Pour chaque produit, le prix le plus bas est identifié
- **API Backend** : Récupération des prix depuis une base de données SQLite
- **Scrapers** : Architecture pour le scraping des sites marocains (Marjane, Marjane Mall, Aswak Assalam)
- **Téléchargement d'images** : Système pour télécharger et sauvegarder les images produits localement

## 🛠️ Stack Technique

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

## 📦 Installation

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
npm install
npm run db:seed  # Initialise la base de données avec des données marocaines
```

## 🚀 Développement

### 1. Lancer le backend (port 3001)
```bash
cd backend
npm run start
```

### 2. Lancer le frontend (port 3000)
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🖼️ Gestion des Images

### Télécharger les images des produits
Après avoir initialisé la base de données, vous pouvez télécharger les vraies images :

```bash
cd backend
npm run images:download
```

Les images seront :
- Téléchargées depuis les sites des magasins
- Sauvegardées dans `backend/public/images/products/`
- Servies via `http://localhost:3001/images/products/`

Si une image ne peut pas être téléchargée, l'application affiche automatiquement un emoji de fallback.

## 🔍 Scraping

Pour scraper les prix en temps réel depuis les sites marocains :

```bash
cd backend
npm run scrape
```

**Note** : Le scraping télécharge aussi automatiquement les images produits.

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Liste tous les produits |
| GET | `/api/products/:id` | Détails d'un produit avec ses prix |
| GET | `/api/stores` | Liste tous les magasins |
| GET | `/api/prices/compare?productIds=id1,id2` | Compare les prix pour une liste de produits |
| GET | `/images/products/:filename` | Servir les images produits |

## 📁 Structure du projet

```
├── src/                    # Frontend Next.js
│   ├── app/               # Pages (App Router)
│   ├── components/        # Composants React
│   ├── hooks/             # Hooks personnalisés
│   ├── services/          # Services API
│   └── types/             # Types TypeScript
│
└── backend/               # Backend Node.js
    ├── public/
    │   └── images/
    │       └── products/  # Images produits téléchargées
    └── src/
        ├── routes/        # Routes API
        ├── scrapers/      # Scrapers pour les sites marocains
        ├── utils/         # Utilitaires (imageDownloader)
        └── db/            # Configuration base de données
```

## 💾 Scripts Backend

| Script | Description |
|--------|-------------|
| `npm run start` | Démarre le serveur backend |
| `npm run dev` | Démarre en mode développement (auto-reload) |
| `npm run db:seed` | Initialise la base de données avec données marocaines |
| `npm run images:download` | Télécharge les images des produits |
| `npm run scrape` | Scrape les sites pour mettre à jour les prix |

## 📊 Sources de données

### Données de seed (actuellement)
Les prix sont initialisés via le seed avec des données réalistes basées sur les prix observés au Maroc (2024-2025) en MAD.

### Scraping
Le backend inclut des scrapers pour :
- Marjane.ma
- MarjaneMall.ma
- AswakAssalam.com

Pour lancer le scraping :
```bash
cd backend
npm run scrape
```

## 🗂️ Catégories de produits

- Pâtes
- Café
- Chocolat
- Boissons
- Produits laitiers
- Céréales

## 📝 Documentation

Pour plus de détails sur le backend, consultez [backend/README.md](backend/README.md)

## ⚠️ Notes

- Les images des sites marocains peuvent être bloquées par des protections anti-scraping
- Les emojis sont utilisés comme fallback si les images ne chargent pas
- Tous les prix sont en MAD (Dirham marocain)
- Pour réinitialiser : supprimez `backend/reglo.db` et relancez `npm run db:seed`
