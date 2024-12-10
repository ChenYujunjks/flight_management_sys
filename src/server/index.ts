// /server/index.ts
import { z } from "zod"; // 用于输入校验
import { db } from "@/server/db";
import { SignUpFormSchema, SignInFormSchema } from "@/lib/types";
import { flight } from "@/server/db/schema"; // 导入 flight 表的定义
import { signupHandler } from "@/server/auth/actions/signup";
import { signinHandler } from "@/server/auth/actions/signin";
import { createTRPCRouter } from "./context";
import { publicProcedure } from "./context";
import { purchaseRouter } from "./router/purchase";
import { searchRouter } from "./router/search";
import { myFlightsRouter } from "./router/myFlights";
import { statisticRouter } from "./router/statistic";
// 初始化 tRPC
const factorial = (n: number): number => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

// 创建 tRPC 路由
export const appRouter = createTRPCRouter({
  calculateFactorial: publicProcedure
    .input(z.number().int().min(0)) // 输入必须是非负整数
    .mutation(({ input }) => {
      if (input > 10) {
        throw new Error(
          "Number too large. Please provide a number less than or equal to 10."
        );
      }
      return { result: factorial(input) };
    }),
  //thats a test router
  getFlights: publicProcedure.query(async () => {
    const flights = await db.select().from(flight);
    return flights;
  }),
  signUp: publicProcedure
    .input(SignUpFormSchema) // 使用预定义的 Schema 验证输入
    .mutation(async ({ input }) => {
      return await signupHandler(input); // 调用抽取的 signUp 函数
    }),
  signIn: publicProcedure
    .input(SignInFormSchema)
    .mutation(async ({ input }) => {
      return await signinHandler(input);
    }),
  // 合并新路由
  flights: createTRPCRouter({
    purchase: purchaseRouter,
    search: searchRouter,
  }),
  myFlights: myFlightsRouter,
  statistic: statisticRouter,
});

export type AppRouter = typeof appRouter;
