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

import { newMeetingSchema } from "../types/meeting.schema";

const CreateMeetingForm = () => {
  const form = useForm<z.infer<typeof newMeetingSchema>>({
    resolver: zodResolver(newMeetingSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof newMeetingSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>Title</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Your meeting name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[length:900px_900px] brightness-125 bg-center hover:opacity-90"
          style={{ backgroundImage: `url(/bg/primary-small-compressed.png)` }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateMeetingForm;
