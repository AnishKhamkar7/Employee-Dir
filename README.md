# Employee Directory

A small employee directory built with React, TypeScript, Vite, Tailwind CSS, Express, Prisma, and PostgreSQL. It supports adding, viewing, editing, deleting, searching, and paging through employee records.

## Requirements

- Node.js 24 or newer
- pnpm 11.25.0 (the repository uses Corepack)
- Docker Desktop running

## Start the project locally

Run these commands from the repository root.

### 1. Install dependencies

```powershell
corepack pnpm install
```

### 2. Set up the server environment

```powershell
Copy-Item apps/server/.env.example apps/server/.env
```

The example file points Prisma to the local Docker database on port `5435`. Keep these values for local development.

### 3. Start PostgreSQL and apply the schema

```powershell
corepack pnpm --filter @repo/server db:up
corepack pnpm --filter @repo/server db:migrate
corepack pnpm --filter @repo/server db:generate
```

### 4. Run the server and client

Open two terminals at the repository root.

In the first terminal:

```powershell
corepack pnpm --filter @repo/server dev
```

In the second terminal:

```powershell
corepack pnpm --filter @repo/client dev
```

Open the local URL printed by Vite in the second terminal. The client forwards its `/api` requests to the server. The REST endpoints are available at `http://localhost:3000/employees`.

## Useful commands

Open Prisma Studio to view database records:

```powershell
corepack pnpm --filter @repo/server db:studio
```

Build both workspace apps:

```powershell
corepack pnpm build
```

Stop the local PostgreSQL container from the repository root:

```powershell
docker compose stop postgres
```

## API routes

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/employees` | List employees; accepts `search`, `page`, and `limit` query parameters |
| `POST` | `/employees` | Add an employee |
| `PUT` | `/employees/:id` | Update an employee |
| `DELETE` | `/employees/:id` | Delete an employee |
