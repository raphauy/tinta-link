"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as ReactIcons from 'react-icons/bs'
import Link from "next/link";
import React, { useState } from "react";
import { Button } from '@/components/ui/button';
import { Grip, Pencil, Trash2, Wine } from 'lucide-react';
import { SocialAccountDialog } from './_update/social-account-dialog';
import { deleteSocialAccountAction, updateSocialAccountAction } from './social-account-actions';
import { DeleteDialog } from './_delete/delete-dialog';
import { getXIcon } from '@/lib/icons';

interface Props {
    id: string
    title: string
    href: string
    icon: string
    color: string
}
export default function SocialAccountEditableBox({ id, title, href, icon, color }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // @ts-ignore
    const socialIcon= ReactIcons[icon]

    const updateTrigger= (<Button variant="ghost" className='p-1'><Pencil className="w-5 h-5" /></Button>)
    const deleteTrigger= (<Button variant="ghost" className='p-1'><Trash2 className="w-5 h-5" /></Button>)
  
    return (
        <div className='flex items-center w-full mb-3'
        style={style}
        >
            <Link href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-1 w-full rounded-md hover:scale-105 bg-slate-50 transition-all border shadow-md max-w-3xl">
                <div className="flex text-center w-full">
                    <div>
                        {
                            icon === "BsTwitter" ?
                                getXIcon() :
                            icon === "Wine" ?
                                <Wine className="w-7 h-7" color={color}/> :
                                React.createElement(socialIcon, { className: `w-7 h-7`, color})
                        }
                    </div>
                    <div className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
                        {title}
                    </div>
                </div>
            </Link>
            <div className='flex items-center ml-1'>
                <SocialAccountDialog id={id} title={title} href={href} icon={icon} trigger={updateTrigger} update={updateSocialAccountAction}/>
                <DeleteDialog 
                    title={"Eliminar Red Social"} 
                    description={"Desea aliminar " + title} 
                    trigger={deleteTrigger} 
                    id={id}
                    eliminate={deleteSocialAccountAction}
                />
                <Button variant="ghost" className='p-1'
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                >
                    <Grip className="w-5 h-5" />
                </Button>
            </div>
 
        </div>
    );
}

