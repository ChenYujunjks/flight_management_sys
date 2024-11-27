// src/server/auth/actions/signup.ts
import { z } from "zod";
import { db } from "@/server/db";
import {
  userTable,
  customer,
  airlineStaff,
  bookingAgent,
} from "@/server/db/schema";
import { cookies } from "next/headers";
import { lucia } from "@/server/auth";
import { generateId } from "lucia";
import { SignUpFormSchema } from "@/lib/types";
import { eq } from "drizzle-orm";

export const signupHandler = async (
  input: z.infer<typeof SignUpFormSchema>
) => {
  const fd = input;

  const hashedPassword = await new (
    await import("oslo/password")
  ).Argon2id().hash(fd.password);

  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      email: fd.email,
      password: hashedPassword,
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`User already exists: ${e.message}`);
    }
    throw new Error("User already exists");
  }

  if (fd.userType == "customer") {
    try {
      await db.insert(customer).values({
        email: fd.email,
        firstName: fd.firstName,
        lastName: fd.lastName,
        password: hashedPassword,
        buildingNumber: fd.buildNum,
        city: fd.city,
        state: fd.state,
        dateOfBirth: fd.dateOfBirth,
        passportNumber: fd.passportNum,
        passportExpiration: fd.passportExp,
        passportCountry: fd.passportCountry,
        phoneNumber: fd.phoneNum,
        street: fd.street,
      });
    } catch {
      await db.delete(userTable).where(eq(userTable.email, fd.email));
      throw new Error("Invalid customer data");
    }
  }

  if (fd.userType === "airline-staff") {
    try {
      await db.insert(airlineStaff).values({
        email: fd.email,
        firstName: fd.firstName,
        lastName: fd.lastName,
        password: hashedPassword,
        dateOfBirth: fd.dateOfBirth,
        airlineName: fd.airlineName,
        permission: fd.permission,
      });
    } catch {
      await db.delete(userTable).where(eq(userTable.email, fd.email));
      throw new Error("Invalid airline staff data");
    }
  }

  if (fd.userType === "booking-agent") {
    const bookingAgentId = generateId(10); // 生成唯一的 bookingAgentId
    try {
      await db.insert(bookingAgent).values({
        email: fd.email,
        password: hashedPassword,
        bookingAgentId,
        airlineName: fd.airlineName,
      });
    } catch {
      await db.delete(userTable).where(eq(userTable.email, fd.email));
      throw new Error("Invalid booking agent data");
    }
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookiesObj = await cookies();
  cookiesObj.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    message: "Signup successful",
  };
};
