# CodeForge 

Welcome to **CodeForge** — a daily coding challenge app built with Vite, React, TypeScript, TailwindCSS, Firebase, and Docker.

---

## Features

- Daily coding challenges
- Streak tracking and motivation
- User authentication with Firebase Auth
- Firestore database for storing challenges and user data
- Fully deployed using Render
- Dockerized production deployment
- Full CI/CD setup with GitHub Actions
- Automatic testing using Vitest and React Testing Library

---

## Tech Stack

- Frontend: **React + Vite + TypeScript**
- Styling: **Tailwind CSS**
- Backend: **Firebase Auth + Firestore**
- Testing: **Vitest + React Testing Library**
- Deployment: **Render (Docker Web Service)**
- CI/CD: **GitHub Actions**

---

## Local Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
```

---

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

Local npm run build generates a /dist folder.

Dockerfile serves pre-built dist/ using Nginx.

GitHub Actions automatically runs tests on every push.

## MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
