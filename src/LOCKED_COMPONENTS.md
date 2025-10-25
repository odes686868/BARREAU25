# Locked Front-End Components

The following components and structures are considered core to the application and should NOT be modified:

## Quiz Types Structure
The four main quiz types in `TestsTab.tsx` must remain unchanged:
```typescript
const quizTypes = [
  {
    title: 'Quiz Rapide',
    description: '10 questions aléatoires de toutes les catégories',
    time: '15 minutes',
    icon: Clock,
    onClick: () => startQuiz(10),
  },
  {
    title: 'Quiz Standard',
    description: '20 questions aléatoires de toutes les catégories',
    time: '30 minutes',
    icon: Clock,
    onClick: () => startQuiz(20),
  },
  {
    title: 'Quiz Complet',
    description: '30 questions aléatoires de toutes les catégories',
    time: '45 minutes',
    icon: Clock,
    onClick: () => startQuiz(30),
  },
  {
    title: 'Quiz Personnalisé',
    description: 'Questions basées sur la catégorie de votre choix',
    icon: Brain,
    onClick: () => setSelectedCategory(0),
  },
];
```

## Categories Structure
The seven categories defined in `data/categories.ts` must remain unchanged:
```typescript
export const categories = [
  { id: 1, name: 'Les règles déontologiques' },
  { id: 2, name: 'La procédure disciplinaire' },
  { id: 3, name: 'La pratique professionnelle' },
  { id: 4, name: "L'exercice illégal" },
  { id: 5, name: 'Le contexte social' },
  { id: 6, name: "L'aide juridique" },
  { id: 7, name: "L'assurance responsabilité" }
];
```

## Core Components Layout
The main layout structure in `App.tsx` and the tab system must be preserved:
- Navbar
- Sidebar with three tabs (Tests, Résultats, Progression)
- Main content area

## Authentication Flow
The authentication flow and structure in `Auth.tsx` must remain unchanged:
- Login/Register toggle
- Email/password fields
- Error handling
- Supabase integration

## Question Types
The Question interface structure must remain consistent:
```typescript
export type Question = {
  id: string;
  category_id: number;
  question_text: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation: string;
};
```

## Important Notes
1. These components form the core structure of the application
2. While internal implementations may be enhanced, the external interfaces and user experience must remain consistent
3. Any modifications should be made to supporting features rather than these core components
4. The quiz type selection UI must maintain its current layout and functionality