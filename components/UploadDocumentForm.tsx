'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

export const UploadDocumentForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      });

       function onSubmit(values: z.infer<typeof formSchema>) {
         // Do something with the form values.
         // ✅ This will be type-safe and validated.
         console.log(values);
       }
  return <form></form>;
};
