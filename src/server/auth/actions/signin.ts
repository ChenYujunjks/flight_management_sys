// src/server/auth/actions/signin.ts
import { z } from "zod";
import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { cookies } from "next/headers";
import { lucia } from "@/server/auth";
import { SignInFormSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const signinHandler = async (
  input: z.infer<typeof SignInFormSchema>
) => {
  const { email, password } = input;
  const existingUser = (
    await db.selectDistinct().from(userTable).where(eq(userTable.email, email))
  )[0]!;

  if (!existingUser) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User does not exist",
    });
  }

  const validPassword = await new (
    await import("oslo/password")
  ).Argon2id().verify(existingUser.password, password);
  if (!validPassword) {
    throw new Error("Incorrect password");
  }

  const session = await lucia.createSession(existingUser.id, {});
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
