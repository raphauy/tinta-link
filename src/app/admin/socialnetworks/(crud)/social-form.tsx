"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { SocialNetwork } from "@prisma/client"
import { useEffect, useState } from "react"
import { getDataSocialNetwork } from "./actions"

const formSchema = z.object({  
  name: z.string({required_error: "Name required"}),
  icon: z.string({required_error: "Icon required"}),
  color: z.string({required_error: "Color required"}),
  hrefTemplate: z.string({required_error: "HrefTemplate required"}),
  order: z.string().refine((val) => !isNaN(Number(val)), { message: "(debe ser un número)" }).optional(),
})

export type SocialNetworkFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<SocialNetworkFormValues> = {}

interface Props{
  id?: string
  create: (data: SocialNetworkFormValues) => Promise<SocialNetwork | null>
  update: (socialnetworkId: string, json: SocialNetworkFormValues) => Promise<SocialNetwork | null>
  closeDialog: () => void
}

export function SocialNetworkForm({ id, create, update, closeDialog }: Props) {
  const form = useForm<SocialNetworkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(data: SocialNetworkFormValues) {
    
    setLoading(true)
    let message= null
    if (id) {
      await update(id, data)
      message= "Social Network updated."
    } else {
      await create(data)
      message= "Social Network created."
    }
    setLoading(false)
      
    toast({title: message })

    closeDialog && closeDialog()
  }

  useEffect(() => {

    if (id) {
      getDataSocialNetwork(id).then((data) => {
        if (!data) return
        form.setValue("name", data.name)
        form.setValue("icon", data.icon)
        form.setValue("color", data.color)
        form.setValue("hrefTemplate", data.hrefTemplate)        
        form.setValue("order", data.order.toString())
      })
    }  
  }, [form, id])



  return (
    <div className="p-4 bg-white rounded-md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Social Network name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input placeholder="Icon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hrefTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Href Template</FormLabel>
              <FormControl>
                <Input placeholder="Href Template" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input placeholder="Order" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button onClick={() => closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
          <Button type="submit" className="w-32 ml-2" >{loading ? <LoadingSpinnerChico /> : <p>Save</p>}</Button>
        </div>
      </form>
    </Form>
   </div>
 )
}