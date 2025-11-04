![Angular 18.0.3](https://img.shields.io/badge/Angular_CLI-18.0.3-blue)

# Développez le front-end en utilisant Angular : OlympicGames 

**Auteur** : Timothé DECOOL

**Contexte :** Projet réalisé dans le cadre de la formation "Développeur Full-Stack - Java et Angular" sur OpenClassrooms.

## Lancer l'application
Avant de lancer l'application, ne pas oublier d'installer les modules requis avec `npm install`.
Utiliser `ng serve` pour lancer un serveur de développement. 
L'application sera disponible en navigant à l'adresse suivante : `http://localhost:4200/`.

## Architecture de l'application

### Composants réutilisables
Regroupés dans le dossier `components`, des composants ont la responsabilité d'encapsuler une logique d'affichage d'éléments récurrents de l'application.
Cela comprend :
- `PageHeader` pour l'affichage des titres des pages de l'application ;
- `StatCard` et `StartCardList` pour l'affichage en liste des cartes de statistiques sur les page d'accueil et de détails pays ;
- `ErrorBanner` encapsule la logique d'affichage d'un message d'erreur le cas échéant.

### Composants de page
Les composants de page, dans le dossier `pages`, ont la charge de structurer les données à fournir aux composants enfants. Les templates organisent les composants enfants.
- `HomeComponent` pour la page de Dashboard ;
- `DetailsComponent` pour la page des détails sur un pays spécifique ;
- `NotFoundComponent` est une page de fallback en cas de recherche d'une adresse non inscrite dans le routing de l'application.

### Services
`OlympicService` encapsule la logique d'accès aux données et de restitution de ces données aux autres composants de l'application.

