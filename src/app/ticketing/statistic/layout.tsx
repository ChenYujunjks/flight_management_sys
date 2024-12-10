import { count, desc, eq, sum } from "drizzle-orm";
import { getUser } from "@/server/auth/getUser";
import { getUserType } from "@/server/auth/getUserType";
import { db } from "@/server/db";
import { bookingAgent, flight, ticket } from "@/server/db/schema";

// 注意，这里不再直接 dynamic import
import CustomerChartWrapper from "./customerChartWrapper";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  const userType = await getUserType(user!.email);

  const bookingAgentId =
    userType === "booking-agent"
      ? (
          await db
            .select({
              id: bookingAgent.bookingAgentId,
            })
            .from(bookingAgent)
            .where(eq(bookingAgent.email, user!.email))
        )[0]!.id
      : null;

  const data = bookingAgentId
    ? await db
        .select({
          customer: ticket.customerEmail,
          count: count(ticket.ticketId),
          sum: sum(flight.price),
        })
        .from(ticket)
        .leftJoin(flight, eq(ticket.flightNum, flight.flightNum))
        .where(eq(ticket.bookingAgentId, bookingAgentId))
        .groupBy(ticket.customerEmail)
        .orderBy(desc(sum(flight.price)))
    : null;

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My {userType === "customer" ? "Spending" : "Commission"}
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {children}
        {userType === "booking-agent" && (
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Top Customers
            </h2>
            {/* 使用客户端组件进行动态导入 */}
            <CustomerChartWrapper data={data!} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Layout;
