"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"


const formSchema = z.object({  
  title: z.string(),
  href: z.string(),
})

export type SocialAccountFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<SocialAccountFormValues> = {}

interface Props{
  id: string
  title: string
  href: string
  update: (userId: string, json: SocialAccountFormValues) => Promise<boolean>
  closeDialog: () => void
}

export function SocialAccountForm({ id, title, href, update, closeDialog }: Props) {
  const form = useForm<SocialAccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: SocialAccountFormValues) {

    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Editado"
      toast({title: message })
    }
    setLoading(false)
      

    closeDialog && closeDialog()
  }

  useEffect(() => {
    form.setValue("title", title)
    form.setValue("href", href)

  }, [form, title, href])



  return (
    <div className="p-4 bg-white rounded-md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="flex justify-end">
          <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
   </div>
 )
}