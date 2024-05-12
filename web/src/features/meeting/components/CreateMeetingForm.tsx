"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { newMeetingSchema } from "../types/meeting.schema";
import { times } from "../types/times";
import FormSelectResponsive from "./FormSelectResponsive";

import { createMeeting } from "@/api/meetingAPI";

export const CreateMeetingForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof newMeetingSchema>>({
    resolver: zodResolver(newMeetingSchema),
    defaultValues: {
      title: "",
      description: "",
      dates: [],
      startTime: "0900",
      endTime: "1700",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof newMeetingSchema>) {
    setIsLoading(true);

    const sortedDates = values.dates.sort((a: Date, b: Date) => a - b);

    const dateStrings = sortedDates.map((date) =>
      moment(date).format("DD-MM-YYYY"),
    );

    const response = await createMeeting({
      title: values.title,
      description: values.description,
      dates: dateStrings,
      startTime: values.startTime,
      endTime: values.endTime,
    });

    if (response && response.status === "success") {
      form.reset();
      router.push(`/${response.data.id}`);
    }
    setIsLoading(false);
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
              <FormLabel className=" font-semibold">Title</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Your meeting name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className=" font-semibold">
                Description <span className=" text-zinc-400">(optional)</span>
              </FormLabel>
              <FormControl className="w-full">
                <Textarea placeholder="A short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className=" font-semibold">
                Choose your Dates
              </FormLabel>
              <FormControl className="w-full">
                <Calendar
                  min={1}
                  mode="multiple"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className=" font-semibold">Earliest Time</FormLabel>
                <FormSelectResponsive
                  field={field}
                  data={times}
                  form={form}
                  placeholder="Select Earliest"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className=" font-semibold">Latest Time</FormLabel>
                <FormSelectResponsive
                  field={field}
                  data={times}
                  form={form}
                  placeholder="Select Latest"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isLoading || isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
