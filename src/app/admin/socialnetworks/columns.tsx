"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2, Wine } from "lucide-react"
import React from "react"
import { DataSocialNetwork, create, eliminate, update } from "./(crud)/actions"
import { DeleteDialog } from "./(crud)/delete-dialog"
import { SocialNetworkDialog } from "./(crud)/social-dialog"
import * as ReactIcons from 'react-icons/bs'


export const columns: ColumnDef<DataSocialNetwork>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )
    },
  },
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Icon
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
    )
  },
  cell: ({ row }) => {
    const data= row.original
    // @ts-ignore
    const socialIcon= ReactIcons[data.icon]

    if (data.icon === "Wine")
      return <Wine className="w-7 h-7" color={data.color}/>

    return (
      <div>
        {React.createElement(socialIcon, { className: `w-7 h-7`, color: data.color})}
      </div>

    )
  },
},
  {
    accessorKey: "hrefTemplate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Href Template
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const editTrigger= (<Edit size={30} className="pr-2 hover:cursor-pointer text-sky-400"/>)
      const eliminateTrigger= (<Trash2 className="text-red-400 hover:cursor-pointer"/>)
 
      return (
        <div className="flex items-center justify-end gap-2">
          <SocialNetworkDialog create={create} update={update} title="Social Network Update" trigger={editTrigger} id={data.id} />
          <DeleteDialog eliminate={eliminate} title="Social Network delete" description={`Delete ${data.name}?`} trigger={eliminateTrigger} id={data.id} />
        </div>

      )
    },
  },
]
