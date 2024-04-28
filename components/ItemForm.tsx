"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { itemSchema } from "@/validationSchemas/items";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDEditor from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Item } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormState } from "react-dom";
import { onSubmit } from "@/lib/actions/items";

type ItemFormData = z.infer<typeof itemSchema>;
interface DefaultOption {
  value: number; // Assuming user IDs are numbers
  label: string;
}
interface Props {
  item?: Item;
  defaultOptions?: DefaultOption[];
  users: DefaultOption[];
}
const ItemForm = ({ item, users, defaultOptions }: Props) => {
  const [formState, submitForm] = useFormState(onSubmit, {
    validationErrors: [],
  });
  const [isChecked, setIsChecked] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setisSubmitting] = useState(false);
  const [selected, setSelected] = useState(defaultOptions || []);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  // async function onSubmit(values: z.infer<typeof itemSchema>) {
  //   console.log("Values", values);
  //   values.purchaseDate = date;
  //   values.payers = selected.map((user) => ({
  //     id: user.value,
  //     name: user.label,
  //   }));
  //   try {
  //     setisSubmitting(true);
  //     setError("");
  //     if (item) {
  //       await axios.patch("/api/items/" + item.id, values);
  //     } else {
  //       await axios.post("/api/items", values);
  //     }
  //     setisSubmitting(false);
  //     router.push("/items");
  //   } catch (error) {
  //     setError("Unkown Error");
  //     setisSubmitting(false);
  //   }
  // }
  const handleCheckboxChange = (event) => {
    console.log(event.target);
    // setIsChecked(event.target.checked); // Update isChecked based on the checkbox state
  };

  const onSelectPayer = (selectedOptions) => {
    setSelected(selectedOptions);
  };
  const animatedComponents = makeAnimated();

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="w-full">
        {/* <form action={submitForm} className="w-full"> */}
          <div className="">
            <div className="flex flex-col md:w-1/2">
              <div className="flex-auto">
                <FormField
                  control={form.control}
                  name="title"
                  defaultValue={item?.title}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-auto">
                <FormField
                  control={form.control}
                  name="price"
                  defaultValue={item?.price || 0}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            const parsedValue = parseFloat(value);
                            if (!isNaN(parsedValue)) {
                              field.onChange(parsedValue);
                            } else {
                              field.onChange("");
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-auto">
                <Controller
                  name="description"
                  defaultValue={item?.description ?? ""}
                  control={form.control}
                  render={({ field }) => (
                    <SimpleMDEditor placeholder="Description" {...field} />
                  )}
                />
              </div>
              <div className="flex-auto">
                <FormLabel>Assign payers</FormLabel>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selected}
                  onChange={onSelectPayer}
                  isMulti
                  options={users}
                />
              </div>

              <div className="flex-auto">
                <FormField
                  control={form.control}
                  defaultValue={isChecked}
                  name="self"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          defaultChecked
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include myself</FormLabel>
                        <FormDescription>
                          By checking this, you are including your account as a
                          payer in this item
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={item?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <UISelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={item?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="OFFSET">Offset</SelectItem>
                    </SelectContent>
                  </UISelect>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {item ? "Update item" : "Register item"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemForm;
