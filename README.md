# Flight Management System

This repository is a full-stack project for managing flight reservations, built with Next.js. It's a comprehensive example to help beginners understand how to use a modern stack, featuring:

- **Next.js** for the frontend framework
- **tRPC** for backend API handling
- **Tailwind CSS + shadcn UI** for styling and component library
- **Drizzle ORM** for database management
- **Lucia** for authentication

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js >= 16
- A database compatible with Drizzle ORM (e.g., PostgreSQL)
- A .env file with appropriate environment variables (explained below)

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
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret"
   LUCIA_SECRET="your-lucia-secret"
   ```

### Running the Project

1. **Database Migration**
   Use Drizzle ORM to migrate your database:

   ```bash
   npx drizzle migrate
   ```

2. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3333` to see the application.

## Tech Stack Overview

### Next.js

The frontend is built using [Next.js](https://nextjs.org/), a React framework with built-in SSR (Server-Side Rendering) and routing capabilities.

### tRPC

[tRPC](https://trpc.io/) is used to create type-safe APIs that communicate between the client and the server. This helps ensure end-to-end type safety.

### Tailwind CSS + shadcn UI

[Tailwind CSS](https://tailwindcss.com/) and [shadcn UI](https://shadcn.dev/) are used for designing beautiful and responsive components.

### Drizzle ORM

[Drizzle ORM](https://drizzle.team) is utilized for database interaction, making queries easy and type-safe.

### Lucia for Authentication

[Lucia](https://lucia-auth.com) is integrated for authentication to keep the app secure, managing sessions and sign-ins.

## Folder Structure

```
.
├── src
│   ├── pages            # Next.js pages
│   ├── Components       # Reusable React components
│   ├── server           # tRPC server setup and backend logic
│   ├── styles           # Tailwind CSS and other styles
│   ├── db               # Drizzle ORM database setup and models
└── .env.example         # Example environment configuration
```

## Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
