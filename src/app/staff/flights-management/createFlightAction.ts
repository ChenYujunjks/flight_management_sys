"use server";

import { createFlightFormSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { airlineStaff, flight } from "@/server/db/schema";

export async function createFlightAction(formData: FormData) {
  const fd = createFlightFormSchema.parse({
    airlineName: formData.get("airlineName"),
    departureAirport: formData.get("departureAirport"),
    departureTime: formData.get("departureTime"),
    arrivalAirport: formData.get("arrivalAirport"),
    arrivalTime: formData.get("arrivalTime"),
    price: formData.get("price"),
    airplaneId: formData.get("airplaneId"),
    status: formData.get("status"),
  });
  const user = await getUser();
  const aNResult = await db
    .select({
      airlineName: airlineStaff.airlineName,
    })
    .from(airlineStaff)
    .where(eq(airlineStaff.email, user!.email));
  const airlineName = aNResult[0]!.airlineName;

  // 生成类似 F5933 的 flightNum
  function generateFlightNum(): string {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 生成 1000 到 9999 的随机数
    return `F${randomNumber}`;
  }
  // 调用生成 flightNum 的函数
  const flightNum = generateFlightNum();

  try {
    await db
      .insert(flight)
      .values({ ...fd, flightNum, airlineName: airlineName });
  } catch {
    throw new Error("Failed to add flight");
  }

  revalidatePath("/staff/flights-management");
}
