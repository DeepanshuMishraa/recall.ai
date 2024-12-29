"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().min(2).max(50),
});

export const CreateNoteForm = ({ onUpload }: { onUpload: () => void }) => {
  const createNote = useMutation(api.notes.createNote);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({
      text: values.text,
    });
    onUpload();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Title of your Note"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your note content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin mr-2" />
          )}
          {form.formState.isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
