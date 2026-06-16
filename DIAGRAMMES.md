# Diagrammes pour le rapport

Ce document regroupe les diagrammes principaux du projet sous une forme adaptée à un rapport académique. Les formulations sont volontairement simples et centrées sur les fonctionnalités métier.

## 1) Diagramme de classes

Ce diagramme présente les entités principales du système et leurs relations.

```mermaid
classDiagram
  class User {
    int id
    string nom
    string prenom
    string email
    DateTime date_naissance
    string password
    string role
    string position
    string department
    DateTime hireDate
  }

  class Profile {
    int id
    string photo
    string cv
    int userId
  }

  class Formation {
    int id
    string title
    string duration
    int trainerId
    string status
    DateTime date
    DateTime createdAt
    DateTime updatedAt
  }

  class Assignment {
    int id
    int userId
    int formationId
    AssignmentStatus status
  }

  class Career {
    int id
    string title
    string position
    string department
    int baseSalary
    int level
    string description
    DateTime createdAt
  }

  class Department {
    int id
    string name
  }

  class AssignmentStatus {
    <<enumeration>>
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }

  User "1" --> "0..1" Profile : has
  User "1" --> "0..*" Formation : trainer
  User "1" --> "0..*" Assignment : receives
  User "0..*" --> "1" Department : belongs to
  Formation "1" --> "0..*" Assignment : contains
  Career "0..*" --> "1" Department : belongs to
  Assignment --> AssignmentStatus
```

## 2) Diagramme de cas d'utilisation

Ce diagramme montre les interactions entre les différents acteurs et les fonctionnalités offertes par la plateforme.

```mermaid
flowchart LR
  Visitor((Utilisateur non authentifié))
  Employee((Employé))
  RH((RH))
  Admin((Administrateur))

  UC1[Créer un compte]
  UC2[Se connecter]
  UC3[Consulter les carrières]
  UC4[Consulter le détail d'une carrière]
  UC5[Consulter les formations]
  UC6[Consulter le détail d'une formation]
  UC7[Mettre à jour son profil]
  UC8[Voir ses formations assignées]
  UC9[Gérer les formations]
  UC10[Affecter une formation à un utilisateur]
  UC11[Consulter les statistiques]
  UC12[Gérer les utilisateurs]
  UC13[Gérer les départements]

  Visitor --> UC1
  Visitor --> UC2
  Visitor --> UC3
  Visitor --> UC4

  Employee --> UC5
  Employee --> UC6
  Employee --> UC7
  Employee --> UC8
  Employee --> UC3
  Employee --> UC4

  RH --> UC9
  RH --> UC10
  RH --> UC11

  Admin --> UC11
  Admin --> UC12
  Admin --> UC13
  Admin --> UC7
```

## 3) Diagrammes de séquence

Les séquences ci-dessous illustrent les échanges entre l'utilisateur, les contrôleurs applicatifs et la base de données.

### 3.1 Inscription / connexion

Cette séquence résume l'authentification de l'utilisateur.

```mermaid
sequenceDiagram
  actor U as Utilisateur
  participant A as AuthController
  participant DB as Base de données

  U->>A: POST /auth/signup ou /auth/login
  A->>DB: Vérifier / créer l'utilisateur
  DB-->>A: Données utilisateur
  A-->>U: Réponse JSON + statut
```

### 3.2 Création et affectation d'une formation

Cette séquence montre le cycle de vie principal d'une formation : sa création puis son affectation à un utilisateur.

```mermaid
sequenceDiagram
  actor T as RH / Administrateur
  participant F as FormationController
  participant Asg as AssignmentController
  participant DB as Base de données

  T->>F: POST /api/formations
  F->>DB: Insert formation
  DB-->>F: Formation créée
  F-->>T: Détails de la formation

  T->>Asg: POST /assignment/assign-formation
  Asg->>DB: Créer l'assignation
  DB-->>Asg: Assignation créée
  Asg-->>T: Confirmation
```

### 3.3 Mise à jour du profil

Cette séquence décrit la mise à jour du profil avec upload de fichiers.

```mermaid
sequenceDiagram
  actor E as Employé
  participant P as ProfileController
  participant U as Middleware upload
  participant DB as Base de données

  E->>P: PUT /profiles/:id
  P->>U: Traiter photo / CV
  U-->>P: Fichiers prêts
  P->>DB: Créer ou mettre à jour le profil
  DB-->>P: Profil enregistré
  P-->>E: Réponse JSON
```

## 4) Remarque

Le modèle Prisma montre une relation explicite entre `User`, `Formation`, `Assignment` et `Profile`. Les modèles `Career` et `Department` sont aussi représentés dans le diagramme avec des liens métier vers le département pour refléter leur appartenance fonctionnelle.

Si tu veux, je peux aussi te préparer une version encore plus propre pour le rapport, avec une mise en page plus courte et un style plus académique, ou te donner une version PlantUML prête à exporter en image.