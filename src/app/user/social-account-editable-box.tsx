"use client"

import { Button } from '@/components/ui/button';
import { getReactIcon } from '@/lib/icons';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Pencil, Trash2 } from 'lucide-react';
import Link from "next/link";
import React from "react";
import { DeleteDialog } from './_delete/delete-dialog';
import { SocialAccountDialog } from './_update/social-account-dialog';
import { deleteSocialAccountAction, updateSocialAccountAction } from './social-account-actions';

interface Props {
    id: string
    title: string
    href: string
    icon: string
    color: string
    isSocialIcon: boolean
    socialIconPosible: boolean
}
export default function SocialAccountEditableBox({ id, title, href, icon, color, isSocialIcon, socialIconPosible }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const socialIcon= getReactIcon(icon)
    if (!socialIcon) return <div>Icon not found</div>

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
                        {React.createElement(socialIcon, { className: `w-7 h-7`, color})}
                    </div>
                    <div className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
                        {title}
                    </div>
                </div>
            </Link>
            <div className='flex items-center ml-1'>
                <SocialAccountDialog id={id} title={title} href={href} 
                    icon={icon} trigger={updateTrigger} 
                    update={updateSocialAccountAction}
                    isSocialIcon={isSocialIcon}
                    socialIconPosible={socialIconPosible}
                />
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

