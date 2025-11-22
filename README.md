# Reglo - Comparateur de Prix

Reglo est une application web qui permet de comparer les prix de produits alimentaires entre différents magasins (Carrefour, Lidl, Monoprix, Auchan, E.Leclerc).

## Fonctionnalités

- **Sélection de produits** : Parcourez et sélectionnez vos produits par catégorie (Pâtes, Café, Chocolat, Boissons, etc.)
- **Comparaison par magasin** : Visualisez les prix de vos produits sélectionnés dans chaque magasin
- **Meilleur prix identifié** : Le magasin le moins cher est mis en avant, avec les économies potentielles
- **Produits les moins chers** : Pour chaque produit, le prix le plus bas est identifié

## Stack Technique

- **Next.js 16** - Framework React avec App Router
- **React 19** - UI Library
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion** - Animations fluides

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Build

```bash
npm run build
npm start
```

## Structure du projet

```
src/
├── app/
│   ├── page.tsx          # Page de sélection des produits
│   ├── compare/
│   │   └── page.tsx      # Page de comparaison des prix
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Styles globaux
├── components/
│   ├── ProductCard.tsx   # Carte produit
│   ├── StoreClusterCard.tsx # Cluster magasin
│   ├── Header.tsx        # En-tête
│   └── CategoryFilter.tsx # Filtre par catégorie
├── data/
│   ├── products.ts       # Données des produits
│   └── stores.ts         # Données des magasins et prix
├── hooks/
│   └── useCart.tsx       # Context et hook pour le panier
└── types/
    └── index.ts          # Types TypeScript
```
