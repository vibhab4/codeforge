# CodeForge 

Welcome to **CodeForge** — a daily coding challenge app built to help developers practice, improve, and maintain their coding skills consistently.
Built with **Vite**, **React**, **TypeScript**, **TailwindCSS**, and **Firebase**, CodeForge allows users to authenticate securely, receive fresh challenges daily, and track their progress over time. The application is fully containerized with **Docker** and deployed using **Render** with a complete **CI/CD pipeline** powered by **GitHub Actions** and **Vitest** for automatic testing.
Whether you're preparing for coding interviews or simply building daily discipline, CodeForge gives you an encouraging environment to level up.


## Features

- Daily coding challenges
- Streak tracking and motivation
- User authentication with Firebase Auth
- Firestore database for storing challenges and user data
- Fully deployed using Render
- Dockerized production deployment
- Full CI/CD setup with GitHub Actions
- Automatic testing using Vitest and React Testing Library

## Tech Stack

- Frontend: **React + Vite + TypeScript**
- Styling: **Tailwind CSS + ShadCN UI**
- Backend: **Firebase Auth + Firestore**
- Deployment: **Docker + Nginx + Render Cloud Hosting**
- Testing:
  - **Vitest** — For unit testing React components in isolation.
  - **React Testing Library** — For testing real user interactions like typing, clicking buttons, and form submission.
  - **Cypress** — For full end-to-end (E2E) testing to simulate actual user flows like login, navigating pages, and solving challenges.
- CI/CD: **GitHub Actions**

## Local Development Setup

```bash
# Clone the repository

git clone https://github.com/vibhab4/codeforge.git
cd codeforge

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
```

## Firebase Credentials

Make sure to create a .env file locally with your Firebase config variables.

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Deployment Notes

- Local npm run build generates a /dist folder.
- Dockerfile serves pre-built dist/ using Nginx.
- GitHub Actions automatically runs tests on every push.

## License

Copyright (c) 2024 Vibha

This project is licensed under the MIT License. 
