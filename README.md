# PizzaTech - Application de Gestion de Pizzeria

## Description
PizzaTech est une application web moderne pour la gestion d'une pizzeria, développée avec React et FastAPI. Elle offre une interface utilisateur intuitive pour les clients et un panneau d'administration complet pour les gestionnaires.

## Fonctionnalités

### Interface Client
- Catalogue de pizzas avec images et descriptions
- Système de panier d'achat
- Processus de commande simplifié
- Suivi des commandes en temps réel
- Interface responsive et moderne

### Panneau d'Administration
- Gestion complète du menu (CRUD)
- Suivi des commandes
- Gestion des utilisateurs
- Tableau de bord avec statistiques
- Interface sécurisée avec authentification

## Technologies Utilisées

### Frontend
- React avec TypeScript
- Tailwind CSS pour le style
- Shadcn/ui pour les composants
- React Router pour la navigation
- Axios pour les requêtes API

### Backend
- FastAPI (Python)
- PostgreSQL pour la base de données
- JWT pour l'authentification
- SQLAlchemy pour l'ORM

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- Python 3.8+
- PostgreSQL

### Installation du Frontend
```bash
# Cloner le repository
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

### Installation du Backend
```bash
# Créer un environnement virtuel Python
python -m venv venv
source venv/bin/activate  # Sur Unix/macOS
# ou
.\venv\Scripts\activate  # Sur Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer la base de données
# Créer un fichier .env avec les variables d'environnement nécessaires

# Lancer le serveur
uvicorn main:app --reload
```

## Configuration
1. Créer un fichier `.env` à la racine du projet
2. Ajouter les variables d'environnement suivantes :
```env
DATABASE_URL=postgresql://user:password@localhost:5432/pizzatech
JWT_SECRET=votre_secret_jwt
```

## Structure du Projet
```
pizzatech/
├── frontend/          # Application React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
├── backend/           # API FastAPI
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── ...
└── ...
```

## Contribution
1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact
Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue dans le repository.
