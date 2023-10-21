"use client"

import * as ReactIcons from 'react-icons/bs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User } from "@prisma/client"
import React, { useState } from "react"
import { SocialAccountForm, SocialAccountFormValues } from "./social-account-form"
import { updateSocialAccountAction } from "../social-account-actions"
import { Wine } from 'lucide-react'

interface Props{
  id: string
  title: string
  href: string
  icon: string
  trigger: React.ReactNode
  update: (userId: string, json: SocialAccountFormValues) => Promise<boolean>
}

export function SocialAccountDialog({ id, title, href, icon, trigger, update }: Props) {
  const [open, setOpen] = useState(false);

  // @ts-ignore
  const socialIcon= ReactIcons[icon]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {
              icon === "Wine" ?
              <Wine className="w-7 h-7"/> :
              React.createElement(socialIcon, { className: `w-7 h-7`})
            }
          </DialogTitle>
        </DialogHeader>
        <SocialAccountForm 
          update={updateSocialAccountAction} 
          closeDialog={() => setOpen(false)} 
          id={id} 
          title={title}
          href={href}
        />
      </DialogContent>
    </Dialog>
  )
}
