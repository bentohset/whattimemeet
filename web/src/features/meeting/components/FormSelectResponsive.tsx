/* eslint-disable @typescript-eslint/no-use-before-define */

"use client";

import { Check, ChevronDown } from "lucide-react";
import React from "react";
import type {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

type Props = {
  data: Option[];
  form: UseFormReturn<FieldValues, undefined>;
  field: ControllerRenderProps<FieldValues>;
  placeholder: string;
};

const FormSelectResponsive = ({ field, data, form, placeholder }: Props) => {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // solves hydration error from useMediaQuery
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  if (isDesktop) {
    return (
      <Select
        open={open}
        onOpenChange={setOpen}
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="px-6">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data.map((o) => {
            return (
              <SelectItem value={o.value} key={o.value}>
                {o.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value
              ? data.find((item) => item.value === field.value)?.label
              : placeholder}
            <ChevronDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList setOpen={setOpen} data={data} form={form} field={field} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function OptionList({
  setOpen,
  data,
  form,
  field,
}: {
  setOpen: (open: boolean) => void;
  data: Option[];
  form: UseFormReturn<FieldValues, undefined>;
  field: ControllerRenderProps<FieldValues>;
}) {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {data.map((o) => (
            <CommandItem
              key={o.value}
              value={o.value}
              onSelect={() => {
                form.setValue(field.name, o.value);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 size-4",
                  o.value === field.value ? "opacity-100" : "opacity-0",
                )}
              />
              {o.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default FormSelectResponsive;
