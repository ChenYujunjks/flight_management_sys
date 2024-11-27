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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignUpFormSchema } from "@/lib/types";
import { trpc } from "@/components/provider";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  const userType = form.watch("userType");

  // tRPC Mutation
  const signUpMutation = trpc.signUp.useMutation({
    onSuccess: () => {
      window.location.href = "/"; // Redirect to homepage or dashboard
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
    },
  });

  const handleSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    setError(null);
    signUpMutation.mutate(data); // Call tRPC sign-up mutation
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="airline-staff">
                            Airline Staff
                          </SelectItem>
                          <SelectItem value="booking-agent">
                            Booking Agent
                          </SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid gap-4">
                {userType === "customer" && (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passportNum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passport Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {userType === "airline-staff" && (
                  <>
                    <FormField
                      control={form.control}
                      name="airlineName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airline Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permission</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select permission" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2">Admin</SelectItem>
                                <SelectItem value="1">Operator</SelectItem>
                                <SelectItem value="0">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              {error && (
                <Alert variant="destructive" className="col-span-full">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                disabled={!SignUpFormSchema.safeParse(form.getValues()).success}
                type="submit"
                className="col-span-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
