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

# 飞行管理系统（Flight Management System）

本仓库是一个用于管理航班预订的全栈项目，基于 Next.js 构建。它是一个帮助初学者理解现代技术栈的综合示例，技术亮点包括：

- **Next.js**：前端框架
- **tRPC**：处理后端 API
- **Tailwind CSS + shadcn UI**：样式与组件库
- **Drizzle ORM**：数据库管理
- **Lucia**：用户认证

---

### 前置条件

- Node.js ≥ 20
- 一个与 Drizzle ORM 兼容的数据库（如 MySQL 或 PostgreSQL）
- `.env` 环境变量配置文件（详见下文）
- 推荐使用 `pnpm` 作为包管理器

---

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/yourusername/flight-management-system.git
   cd flight-management-system
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **配置环境变量**

   在项目根目录下创建 `.env` 文件，内容示例如下：

   ```env
   DATABASE_URL="mysql://your-username:your-password@localhost:3306/your-database-name"
   NEXTAUTH_SECRET="your-secret"
   LUCIA_SECRET="your-lucia-secret"
   ```

### 启动项目

1. **运行开发服务器**

   启动开发服务器：

   ```bash
   pnpm dev
   ```

   打开浏览器访问 `http://localhost:3000` 查看应用。

---

## 技术栈概览

### Next.js

前端使用 [Next.js](https://nextjs.org/) 框架构建，提供服务端渲染（SSR）和文件系统路由。

### tRPC

使用 [tRPC](https://trpc.io/) 创建类型安全的 API，实现客户端与服务端之间的端到端类型检查。

### Tailwind CSS + shadcn UI

使用 [Tailwind CSS](https://tailwindcss.com/) 与 [shadcn UI](https://shadcn.dev/) 构建响应式且美观的界面组件。

### Drizzle ORM

通过 [Drizzle ORM](https://drizzle.team) 与数据库交互，支持声明式 schema 管理与类型安全的 SQL 查询。

### Lucia 身份验证

集成 [Lucia](https://lucia-auth.com) 提供用户认证与会话管理，确保应用安全。

---

## 许可证

本项目基于 MIT 协议开源，详情见 LICENSE 文件。
