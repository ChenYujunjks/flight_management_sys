"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { airplaneFormSchema } from "@/lib/types"; // 确保 schema 已更新为使用 airplaneId
import { addAirplaneFormAction } from "./addAirplaneFormAction";

const AddAirplaneForm = () => {
  const form = useForm<z.infer<typeof airplaneFormSchema>>({
    mode: "all",
    resolver: zodResolver(airplaneFormSchema),
  });

  return (
    <Form {...form}>
      <form
        action={addAirplaneFormAction}
        className="m-2 flex flex-col gap-4"
        method="post"
      >
        {/* Airplane ID Input */}
        <FormField
          control={form.control}
          name="airplaneId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airplane ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Enter Airplane ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          disabled={
            airplaneFormSchema.safeParse(form.getValues()).success === false
          }
          type="submit"
        >
          Add Airplane
        </Button>
      </form>
    </Form>
  );
};

export default AddAirplaneForm;
