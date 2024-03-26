"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { itemSchema } from "@/validationSchemas/items";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Item } from "@prisma/client";

type ItemFormData = z.infer<typeof itemSchema>;
interface Props {
  item?: Item;
}
const ItemForm = ({ item }: Props) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    console.log(values);
    try {
      setisSubmitting(true);
      setError("");
      if (item) {
        // update
        await axios.patch("/api/items/" + item.id, values);
      } else {
        await axios.post("/api/items", values);
      }
      setisSubmitting(false);
      router.push("/items");
    } catch (error) {
      console.log(error);
      setError("Unkown Error");
      setisSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={item?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item name</FormLabel>
                <FormControl>
                  <Input placeholder="Item title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <Controller
            name="description"
            defaultValue={item?.description ?? ""}
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={item?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
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
                  </Select>
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
