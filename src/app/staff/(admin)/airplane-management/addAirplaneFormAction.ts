"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { airplaneFormSchema } from "@/lib/types";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { airlineStaff, airplane } from "@/server/db/schema";

export async function addAirplaneFormAction(formData: FormData) {
  // 从表单中解析数据
  const fd = airplaneFormSchema.parse({
    airplaneId: formData.get("airplaneId"),
  });
  const user = await getUser();

  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  if (!aNResult.length) {
    throw new Error("Airline staff not found or unauthorized");
  }
  const airlineName = aNResult[0]!.airlineName;
  const { airplaneId } = fd;
  try {
    // 插入 airplane 数据
    await db.insert(airplane).values({
      id: airplaneId,
      airlineName,
    });
  } catch {
    throw new Error("Failed to add airplane");
  }

  revalidatePath("/staff/airplane-management");
}
