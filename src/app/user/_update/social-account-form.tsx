"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"


const formSchema = z.object({  
  title: z.string(),
  href: z.string(),
  socialIcon: z.boolean(),
})

export type SocialAccountFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<SocialAccountFormValues> = {
  socialIcon: false
}

interface Props{
  id: string
  title: string
  href: string
  socialIcon: boolean
  socialIconPosible: boolean
  update: (userId: string, json: SocialAccountFormValues) => Promise<boolean>
  closeDialog: () => void
}

export function SocialAccountForm({ id, title, href, socialIcon, socialIconPosible, update, closeDialog }: Props) {
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
    form.setValue("socialIcon", socialIcon)

  }, [form, title, href, socialIcon])



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

        {socialIconPosible &&         
        <FormField
          control={form.control}
          name="socialIcon"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Ícono de red social
                </FormLabel>
                <FormDescription>
                  Mostrar este link como un icono de red social.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        }

      <div className="flex justify-end">
          <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancelar</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Guardar</p>}</Button>
        </div>
      </form>
    </Form>
   </div>
 )
}