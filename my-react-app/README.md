# MyApp — React + TypeScript Starter

A production-ready starter project built with **React 19**, **TypeScript**, **Vite**, **React Router v7**, and **Axios**.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| TypeScript | Static typing |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| ESLint + Prettier | Linting & formatting |
| Express 4 | REST API server |
| JSON Web Tokens | Auth tokens |
| bcryptjs | Password hashing |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-react-app

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL for the API |
| `VITE_APP_NAME` | Application name |
| `VITE_APP_VERSION` | Application version |

### Running the App

```bash
# Start both frontend (5173) and backend (3001) together
npm run dev:all

# Or start them separately
npm run dev           # Frontend only → http://localhost:5173
npm run dev:server    # Backend only  → http://localhost:3001

# Build for production
npm run build

# Preview production build
npm run preview
```

### Server setup

```bash
cd server
cp .env .env.local   # customise JWT_SECRET before production use
npm install
npm run dev
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Format source files with Prettier
npm run format

# Check formatting without writing
npm run format:check
```

---

## Project Structure

```
my-react-app/
├── public/                  # Static public assets
├── src/
│   ├── assets/              # Images, fonts, SVGs
│   ├── components/
│   │   └── Layout/          # Header, Footer, Layout wrapper
│   ├── hooks/               # Custom React hooks (useFetch, useLocalStorage)
│   ├── pages/               # Route-level components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/
│   │   └── api.ts           # Axios instance + CRUD helpers
│   ├── types/
│   │   └── index.ts         # Shared TypeScript types
│   ├── utils/
│   │   └── helpers.ts       # Pure utility functions
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables (git-ignored)
├── .env.example             # Environment variable template
├── .prettierrc              # Prettier config
├── eslint.config.js         # ESLint flat config
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

---

## Routes

| Path | Component |
|------|-----------|
| `/` | Home Page |
| `/about` | About Page |
| `*` | 404 Not Found |

---

## API Service

The reusable API service (`src/services/api.ts`) provides:

- Pre-configured Axios instance with base URL and timeout
- Request interceptor — attaches `Authorization: Bearer <token>` from `localStorage`
- Response interceptor — clears token on 401
- Generic typed helpers: `get<T>`, `post<T>`, `put<T>`, `del<T>`

**Example usage:**

```ts
import { get } from './services/api';
import { User } from './types';

const response = await get<User[]>('/users');
console.log(response.data);
```

---

## Custom Hooks

| Hook | Description |
|------|-------------|
| `useFetch<T>(url)` | Fetches data from the API with loading/error state and `refetch()` |
| `useLocalStorage<T>(key, initial)` | Synced `useState` backed by `localStorage` |
