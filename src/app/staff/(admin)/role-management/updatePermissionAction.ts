"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAirlineStaffPermission } from "@/server/auth/getAirlineStaffPermission";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { airlineStaff } from "@/server/db/schema";

const updatePermissionSchema = z.object({
  email: z.string().email(),
  permission: z.number(),
});

export async function updatePermissionAction(input: z.infer<typeof updatePermissionSchema>) {
  const { email, permission } = updatePermissionSchema.parse(input);

  const user = await getUser();
  if ((await getAirlineStaffPermission(user!.email)) !== 2) {
    throw new Error("Unauthorized");
  }

  try {
    await db
      .update(airlineStaff)
      .set({ permission })
      .where(eq(airlineStaff.email, email));

    revalidatePath("/staff/(admin)/role-management");
    return "Success";
  } catch (e) {
    console.error("Error updating permission:", e);
    throw new Error("Failed to update");
  }
}
