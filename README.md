# Flight Management System

This repository is a full-stack project for managing flight reservations, built with Next.js. It's a comprehensive example to help beginners understand how to use a modern stack, featuring:

- **Next.js** for the frontend framework
- **tRPC** for backend API handling
- **Tailwind CSS + shadcn UI** for styling and component library
- **Drizzle ORM** for database management
- **Lucia** for authentication

---

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js >= 16
- A database compatible with Drizzle ORM (e.g., MySQL or PostgreSQL)
- A `.env` file with appropriate environment variables (explained below)
- `pnpm` as your package manager (recommended)

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

3. **Environment Setup**

   Create a `.env` file in the root directory and configure your environment variables. Example:

   ```env
   DATABASE_URL="mysql://your-username:your-password@localhost:3306/your-database-name"
   NEXTAUTH_SECRET="your-secret"
   LUCIA_SECRET="your-lucia-secret"
   ```

4. **Database Initialization**

   - First, apply your schema to the database:

     ```bash
     npx drizzle-kit push
     ```

   - Then, source the database initialization scripts:
     ```bash
     source db_init/your-script-1.sql
     source db_init/your-script-2.sql
     source db_init/your-script-3.sql
     ```

---

### Running the Project

1. **Run the Development Server**

   Start the development server:

   ```bash
   pnpm dev
   ```

   Navigate to `http://localhost:3000` to see the application.

---

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
