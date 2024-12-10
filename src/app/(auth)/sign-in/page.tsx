// ~/pages/signin/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInFormSchema } from "@/lib/types";
import { trpc } from "@/components/provider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // 用于重定向
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "all",
    resolver: zodResolver(SignInFormSchema),
  });

  // tRPC Mutation
  const signInMutation = trpc.signIn.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
    },
  });
  console.log(signInMutation);

  const handleSubmit = (data: z.infer<typeof SignInFormSchema>) => {
    setError(null);
    signInMutation.mutate(data); // 调用 tRPC sign-in mutation
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-sm"
                        placeholder="example@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                disabled={
                  !form.formState.isValid || signInMutation.status === "pending"
                }
                type="submit"
                className="max-w-sm"
              >
                {signInMutation.status === "pending"
                  ? "Signing In..."
                  : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
