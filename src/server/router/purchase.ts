// router/flights/purchase.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../context";
import { db } from "@/server/db";
import { bookingAgent, ticket } from "@/server/db/schema";
import { getUser } from "@/server/auth/getUser";
import { getUserType } from "@/server/auth/getUserType";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid"; // 引入 UUID 库
import { eq } from "drizzle-orm";

export const purchaseRouter = publicProcedure
  .input(
    z.object({
      flightNum: z.string(),
      email: z.string().email().optional(),
    })
  )
  .mutation(async ({ input }) => {
    const { flightNum, email } = input;

    // 获取用户信息
    const user = await getUser();

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Please sign in",
      });
    }

    const userType = await getUserType(user.email);

    try {
      if (userType === "customer") {
        await db.insert(ticket).values({
          ticketId: uuidv4(), // 生成唯一 ticketId
          customerEmail: email || user.email,
          flightNum,
        });
        revalidatePath("/ticketing/my-flights");
        revalidatePath("/ticketing/spending");
      } else if (userType === "booking-agent") {
        const bookingAgentId = (
          await db
            .selectDistinct({ bookingAgentId: bookingAgent.bookingAgentId })
            .from(bookingAgent)
            .where(eq(bookingAgent.email, user.email))
        )[0]?.bookingAgentId;

        if (!bookingAgentId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid booking agent",
          });
        }

        await db.insert(ticket).values({
          ticketId: uuidv4(), // 生成唯一 ticketId
          bookingAgentId,
          customerEmail: email!,
          flightNum,
        });
        revalidatePath("/ticketing/my-flights");
        revalidatePath("/ticketing/statistics");
        revalidatePath("/ticketing/spending");
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid user type",
        });
      }

      return { message: "Purchased successfully" };
    } catch (e) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to purchase",
      });
    }
  });
