# Reglo Backend - Marché Marocain

Backend API pour l'application Reglo de comparaison de prix au Maroc.

## 🇲🇦 Magasins Marocains

- **Marjane** - https://www.marjane.ma
- **Marjane Mall** - https://www.marjanemall.ma
- **Aswak Assalam** - https://aswakassalam.com
- **Carrefour Maroc** - https://www.carrefour.ma
- **Acima** - https://www.acima.ma

## 💰 Devise

Tous les prix sont en **MAD (Dirham marocain)**

## 🚀 Installation

```bash
npm install
```

## 📦 Initialiser la base de données

```bash
npm run db:seed
```

Cela va créer :
- 5 magasins marocains
- 17 produits avec prix réalistes
- 85 prix au total

## 🖼️ Gestion des Images

### Option 1 : Utiliser les emojis (par défaut)

Le seed utilise des emojis par défaut. Pas besoin de faire quoi que ce soit.

### Option 2 : Télécharger les vraies images

Après avoir initialisé la base de données, téléchargez les images :

```bash
npm run images:download
```

Ce script va :
1. Télécharger toutes les images depuis les sites des magasins
2. Les sauvegarder dans `backend/public/images/products/`
3. Mettre à jour la base de données avec les chemins locaux

Les images seront servies depuis `http://localhost:3001/images/products/`

### Option 3 : Scraper en direct

Pour scraper les produits et obtenir les images en temps réel :

```bash
npm run scrape
```

**Note** : Les sites marocains ont des protections anti-scraping. Le téléchargement peut échouer pour certaines images. Dans ce cas, l'application affichera automatiquement des emojis de fallback.

## 🏃 Démarrer le serveur

### Mode développement (avec auto-reload)
```bash
npm run dev
```

### Mode production
```bash
npm run start
```

Le serveur démarre sur `http://localhost:3001`

## 📚 API Endpoints

### Products
- `GET /api/products` - Liste tous les produits
- `GET /api/products/:id` - Détails d'un produit
- `GET /api/products?category=Pâtes` - Filtrer par catégorie

### Stores
- `GET /api/stores` - Liste tous les magasins

### Prices
- `GET /api/prices/compare?productIds=id1,id2` - Comparer les prix

### Images (statique)
- `GET /images/products/:filename` - Servir les images

## 📝 Catégories de produits

- Pâtes
- Café
- Chocolat
- Boissons
- Produits laitiers
- Céréales

## 🔧 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrer en mode développement |
| `npm run start` | Démarrer en production |
| `npm run db:seed` | Initialiser la base de données |
| `npm run images:download` | Télécharger les images des produits |
| `npm run scrape` | Scraper les sites pour mettre à jour les prix |

## 📂 Structure

```
backend/
├── public/
│   └── images/
│       └── products/        # Images téléchargées
├── src/
│   ├── db/
│   │   ├── database.js      # Configuration SQLite
│   │   └── seed.js          # Données initiales (Maroc)
│   ├── routes/
│   │   ├── products.js
│   │   ├── stores.js
│   │   └── prices.js
│   ├── scrapers/
│   │   ├── base.js          # Scraper de base
│   │   ├── marjane.js       # Scraper Marjane
│   │   ├── marjanemall.js   # Scraper Marjane Mall
│   │   ├── aswakassalam.js  # Scraper Aswak Assalam
│   │   ├── downloadImages.js # Script de téléchargement
│   │   └── index.js
│   ├── utils/
│   │   └── imageDownloader.js # Utilitaire d'images
│   └── index.js             # Serveur Express
└── reglo.db                 # Base de données SQLite
```

## ⚠️ Notes importantes

1. **Images** : Les sites marocains bloquent souvent le scraping. Les emojis sont utilisés comme fallback.
2. **Prix** : Les prix sont en MAD (1 EUR ≈ 10.8 MAD)
3. **Scraping** : Respectez les conditions d'utilisation des sites. Utilisez un délai entre les requêtes.
4. **Base de données** : Supprimez `reglo.db` et relancez `npm run db:seed` pour réinitialiser.

## 🔄 Flux de travail recommandé

### Première utilisation
```bash
# 1. Installer les dépendances
npm install

# 2. Initialiser la base de données
npm run db:seed

# 3. (Optionnel) Télécharger les images
npm run images:download

# 4. Démarrer le serveur
npm run dev
```

### Mise à jour des prix
```bash
# Scraper les sites pour obtenir les nouveaux prix
npm run scrape

# Télécharger les nouvelles images
npm run images:download
```

## 🆘 Résolution de problèmes

### Les images ne s'affichent pas
- Vérifiez que le backend est démarré sur le port 3001
- Exécutez `npm run images:download` pour télécharger les images
- En cas d'échec, les emojis s'afficheront automatiquement

### Erreur SQLite sur Windows
- Supprimez `node_modules` et `package-lock.json`
- Réinstallez : `npm install`

### Les prix ne se mettent pas à jour
- Supprimez `reglo.db`
- Relancez : `npm run db:seed`
