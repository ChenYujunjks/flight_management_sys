# Flight Management System

This repository is a full-stack project for managing flight reservations, built with Next.js. It's a comprehensive example to help beginners understand how to use a modern stack, featuring:

## Tech Stack Overview

### Next.js

The frontend is built using [Next.js](https://nextjs.org/), a React framework with built-in SSR (Server-Side Rendering) and routing capabilities.

### tRPC

[tRPC](https://trpc.io/) is used to create type-safe APIs that communicate between the client and the server. This helps ensure end-to-end type safety.

### Tailwind CSS + shadcn UI

[Tailwind CSS](https://tailwindcss.com/) and [shadcn UI](https://shadcn.dev/) are used for designing beautiful and responsive components.

### Drizzle ORM

[Drizzle ORM](https://drizzle.team) is utilized for database interaction, making queries easy and type-safe. You can manage your database schema with a declarative approach.

### Lucia for Authentication

[Lucia](https://lucia-auth.com) is integrated for authentication to keep the app secure, managing sessions and sign-ins.

---
## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js ≥ 20
- `pnpm` as your package manager
- MySQL database (or compatible)
- `.env` file with the correct environment variables (see below)

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/flight-management-system.git
   cd flight-management-system
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://your-username:your-password@localhost:3306/fmp"
   ```

   > Make sure you have already created the `fmp` database in your local MySQL instance.

4. **Push schema to the database**

   ```bash
   npx drizzle-kit push
   ```

5. **Seed the database**

   ```bash
   pnpm seed
   ```

---

### Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.
