import { initTRPC } from "@trpc/server";
import { z } from "zod"; // 用于输入校验

// 初始化 tRPC
const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const factorial = (n: number): number => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

// 创建 tRPC 路由
export const appRouter = router({
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
});

export type AppRouter = typeof appRouter;

// 这是一个非常简单的 tRPC 例子，用于测试后端连接是否成功。
// 你可以在前端通过 tRPC 客户端调用 `calculateFactorial`，传递一个数字来测试是否连接成功。
