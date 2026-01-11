# MicroHub Frontend

React-based frontend for the MicroHub social media platform.

## Overview

Single-page application built with React, TypeScript, and Vite. Provides user interface for authentication, creating posts, commenting, liking, and viewing profiles.

## Technology Stack

- **React** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe development
- **Axios** - HTTP client
- **Bootstrap** - CSS framework
- **React Bootstrap** - React components

## Quick Start

```bash
# Navigate to root directory (Microhub)
# Install dependencies
npm install

# Development server
npm run dev
# Access at: http://localhost:5173
```

## Environment Variables

Create `.env` in the MicroHub directory:

```bash
VITE_POSTS_SERVICE_URL=http://localhost:3000
VITE_USERS_SERVICE_URL=http://localhost:3002
VITE_COMMENTS_SERVICE_URL=http://localhost:3003
VITE_LIKES_SERVICE_URL=http://localhost:3001
VITE_PROFILE_SERVICE_URL=http://localhost:3004
```
Backend repository: https://github.com/RSO-Projekt-Skupina-2/Services

## Project Structure

```
MicroHub/
├── src/
│   ├── main.tsx              # App entry point
│   ├── api.ts                # API client configuration
│   ├── auth.tsx              # Authentication context
│   ├── components/           # Reusable components
│   │   ├── loginForm.tsx
│   │   ├── createUserForm.tsx
│   │   ├── feedCard.tsx
│   │   ├── mainHeader.tsx
│   │   ├── searchComponent.tsx
│   │   └── ...
│   ├── pages/                # Page components
│   │   ├── LoginPage.tsx
│   │   ├── CreateUser.tsx
│   │   ├── FeedPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── CreatePost.tsx
│   └── styles/               # CSS files
│       ├── App.css
│       ├── feed.css
│       └── ...
├── serverless-function/      # Azure Functions
│   └── src/functions/health.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└...
```

## Architecture

### Routing

Routes are defined in `main.tsx` using React Router:

- `/login` - Login page
- `/newUser` - User registration
- `/` - Main feed (protected)
- `/profile` - User profile (protected)
- `/newPost` - Create new post (protected)

Protected routes require authentication (JWT token in localStorage).

### Authentication Flow

1. **Login**: User enters credentials → `POST /users/login` → Receive JWT token
2. **Token Storage**: Token saved to `localStorage`
3. **Protected Routes**: `ProtectedRoute` component checks for token
4. **API Calls**: Token attached to requests via `Authorization: Bearer {token}`
5. **Logout**: Clear token from localStorage

## Key Components

### `loginForm.tsx`
- Login form with email/password
- Calls `/users/login` endpoint
- Stores JWT token on success

### `createUserForm.tsx`
- Registration form
- Validates password length (min 6 chars)
- Calls `/users/register` endpoint

### `feedCard.tsx`
- Displays individual post
- Shows likes count and user's like status
- Allows commenting
- Delete button for post author

### `mainHeader.tsx`
- Navigation bar
- Search functionality
- Topic filtering
- Logout button

### `ProtectedRoute.tsx`
- Route guard for authenticated pages
- Redirects to login if no token found

## Pages

### LoginPage
- Default landing page
- Login and registration forms
- Redirects to feed on successful auth

### CreateUserPage
- Page for registering new users

### FeedPage
- Main feed displaying all posts
- Filter by topic
- Pagination
- Create new post button

### ProfilePage
- User statistics (post count, likes, comments)
- User information
- Aggregated data from Profile service

### CreatePost
- Form to create new post
- Title, content, topics
- Topic selection (predefined list)

## CI/CD Pipeline

GitHub Actions automatically builds and deploys the frontend to Azure Kubernetes Service (AKS) on every push to main.

### Workflow
1. Build Docker image for React app
2. Push to Azure Container Registry (ACR)
3. Deploy to Kubernetes cluster in `ingress` namespace

### Required Secrets
Set these in GitHub repository settings → Secrets:
- `ACR_LOGIN_SERVER` - Azure Container Registry URL
- `ACR_USERNAME` - ACR username
- `ACR_PASSWORD` - ACR password
- `KUBECONFIG_DATA` - Base64 encoded kubeconfig
- `INGRESS_URL` - Your Ingress controller external IP
- `SERVERLESS_FUNCTION_URL` - Your serverless function address




