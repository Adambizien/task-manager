# Task Manager — React, Vite & Tailwind

## 📌 Description
Task Manager est une application React développée avec Vite permettant de gérer des tâches classées par catégorie (Travail, Personnel, Urgent).  
L'utilisateur peut ajouter, modifier et supprimer des tâches.  
Le design est intégralement réalisé avec **TailwindCSS**, et l'application est pleinement responsive.

---

## 🚀 Fonctionnalités
### ✔ Gestion des tâches
- Ajout d’une tâche avec :
  - Description
  - Catégorie (Travail, Personnel, Urgent)
- Modification d'une tâche existante
- Suppression d’une tâche
- Affichage organisé sous forme de cartes

### 🎨 UI / UX
- Interface responsive (mobile, tablette, desktop)
- Style 100% Tailwind
- Couleurs spécifiques selon la catégorie

### 🏗 Architecture
- **TaskForm** : Formulaire permettant d’ajouter ou modifier une tâche.  
- **TaskList** : Affiche toutes les tâches sous forme de liste.  
- **TaskCard** : Petite carte qui représente une tâche individuelle (description, catégorie, priorité, actions).  
- **App** : Composant principal qui gère l’état global et transmet les données aux autres composants.

---

## 🛠 Technologies utilisées
- **React 19**
- **React DOM 19**
- **Vite 7**
- **TypeScript 5**
- **TailwindCSS 4**
- **Lucide React** (icônes)

---

## 📦 Installation et lancement

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/Adambizien/task-manager.git
cd task-manager
```
