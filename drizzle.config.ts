import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // 指定输出的文件夹
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
