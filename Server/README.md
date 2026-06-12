# my-react-app-server

Express + TypeScript REST API server for [my-react-app](../my-react-app).

## Stack

| Package | Purpose |
|---------|---------|
| Express 4 | HTTP server |
| TypeScript | Static typing |
| jsonwebtoken | JWT auth tokens |
| bcryptjs | Password hashing |
| cors | Cross-origin requests |
| dotenv | Environment variables |
| ts-node-dev | Dev server with hot-reload |

## Setup

```bash
npm install
cp .env.example .env   # then edit JWT_SECRET
```

## Running

```bash
npm run dev     # dev server with hot-reload → http://localhost:3001
npm run build   # compile to dist/
npm start       # run compiled output
```

## API Endpoints

All responses follow `{ data, status, message }`.

### Auth

| Method | Path | Auth | Body |
|--------|------|------|------|
| `POST` | `/api/auth/register` | — | `{ name, email, password }` |
| `POST` | `/api/auth/login` | — | `{ email, password }` |
| `GET` | `/api/auth/me` | JWT | — |

### Users

| Method | Path | Auth | Body |
|--------|------|------|------|
| `GET` | `/api/users` | JWT | — |
| `GET` | `/api/users/:id` | JWT | — |
| `PUT` | `/api/users/:id` | JWT (own) | `{ name?, email? }` |
| `DELETE` | `/api/users/:id` | JWT (own) | — |

### Health

```
GET /api/health
```

## Seed accounts

| Email | Password |
|-------|----------|
| alice@example.com | password123 |
| bob@example.com | password123 |

## Project structure

```
src/
├── controllers/
│   ├── authController.ts
│   └── userController.ts
├── middleware/
│   ├── auth.ts           ← JWT Bearer guard
│   └── errorHandler.ts   ← 404 + global error handler
├── routes/
│   ├── auth.ts
│   ├── users.ts
│   └── index.ts
├── types/index.ts
├── utils/
│   ├── response.ts       ← sendSuccess / sendError helpers
│   └── store.ts          ← in-memory user store
└── index.ts              ← app entry point
```
