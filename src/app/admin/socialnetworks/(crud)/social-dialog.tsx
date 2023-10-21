"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SocialNetwork } from "@prisma/client"
import { useState } from "react"
import { SocialNetworkForm, SocialNetworkFormValues } from "./social-form"

interface Props{
  title: string
  trigger: React.ReactNode
  id?: string
  create: (json: SocialNetworkFormValues) => Promise<SocialNetwork | null>
  update: (socialnetworkId: string, json: SocialNetworkFormValues) => Promise<SocialNetwork | null>
}

export function SocialNetworkDialog({ title, trigger, id, create, update }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SocialNetworkForm create={create} update={update} closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
