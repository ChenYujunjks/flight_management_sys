import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql", // 数据库类型，这里指定为 'mysql'
  dbCredentials: {
    host: "localhost", // 数据库主机地址
    port: 3306, // 数据库端口
    user: "root", // 数据库用户名
    password: "process.env.DB_PASSWORD", // 数据库密码
    database: "fmp", // 数据库名称
  },
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db", // 指定输出的文件夹
});
