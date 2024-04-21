import React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema } from "../types/login.schema";

interface Props {
  submitFn: (name: string) => void;
}

export const LoginForm = (props: Props) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    form.reset();
    props.submitFn(values.name);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full space-x-2 flex-row flex items-baseline">
              <FormLabel className=" font-semibold">Your Name:</FormLabel>
              <FormControl className="w-fit">
                <Input placeholder="" {...field} className="h-8" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" className="text-sm h-8">
          Login
        </Button>
      </form>
    </Form>
  );
};
