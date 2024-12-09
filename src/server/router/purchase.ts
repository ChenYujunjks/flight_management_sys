// router/flights/purchase.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../context";
import { db } from "@/server/db";
import { count, eq } from "drizzle-orm";
import { airplane, bookingAgent, flight, ticket } from "@/server/db/schema";
import { getUser } from "@/server/auth/getUser";
import { getUserType } from "@/server/auth/getUserType";
import { revalidatePath } from "next/cache";

export const purchaseRouter = publicProcedure
  .input(
    z.object({
      flightNum: z.string(),
      email: z.string().email().optional(),
    })
  )
  .mutation(async ({ input }) => {
    const { flightNum, email } = input;

    // 检查航班是否已满
    try {
      const ticketCount = (
        await db
          .select({ count: count() })
          .from(ticket)
          .where(eq(ticket.flightNum, flightNum))
      )[0]!.count;

      const airplaneCapacity = (
        await db
          .select({ airplaneCapacity: airplane.seatsAmount })
          .from(airplane)
          .leftJoin(flight, eq(flight.airplaneId, airplane.id))
          .where(eq(flight.flightNum, flightNum))
      )[0]!.airplaneCapacity;

      if (ticketCount >= airplaneCapacity) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Flight is full",
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to check flight capacity",
      });
    }

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
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to purchase",
      });
    }
  });
