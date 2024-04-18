"use client";

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
import { Textarea } from "@/components/ui/textarea";

import { feedbackSchema } from "../types/feedback.schema";

export const FeedbackForm = () => {
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      contact: "",
      feedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-y-4"
      >
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className=" font-semibold">
                Contact <span className=" text-zinc-400">(optional)</span>
              </FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="contact no. or email or telegram or others"
                  {...field}
                  className="h-8"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className=" font-semibold">
                Feedback / Question
              </FormLabel>
              <FormControl className="w-full">
                <Textarea
                  placeholder="any feedback or question you have"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          className="text-sm"
          disabled={!form.formState.isDirty}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
