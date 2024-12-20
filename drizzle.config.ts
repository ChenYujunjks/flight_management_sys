import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // 指定输出的文件夹
  dialect: "mysql", // 数据库类型，这里指定为 'mysql'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./src/server/db/schema.ts",
});
