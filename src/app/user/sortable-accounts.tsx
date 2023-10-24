"use client"

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { DataSocialAccount, getSocialAccountsAction, setNewOrderAction } from "./social-account-actions";
import SocialAccountEditableBox from "./social-account-editable-box";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    userId: string
    interchangeOrders: (id1: string, id2: string) => Promise<boolean>
}

export default function SortableAccounts({ userId, interchangeOrders}: Props) {

    const [orderedAccounts, setOrderedAccounts] = useState([] as DataSocialAccount[])
    const searchParams= useSearchParams()
    
    useEffect(() => {
        async function getSocialAccounts() {
            const socialAccounts= await getSocialAccountsAction(userId, false)
            setOrderedAccounts(socialAccounts)
        }
        getSocialAccounts()
    }, [userId, searchParams])
    
    function handleDragEnd(event: any) {
        const { active, over } = event
        console.log("active", active)
        console.log("over", over)
        if (active.id !== over.id) {
            const oldIndex= orderedAccounts.findIndex((socialAccount) => socialAccount.id === active.id)
            const newIndex= orderedAccounts.findIndex((socialAccount) => socialAccount.id === over.id)
            const neworderedAccounts= arrayMove(orderedAccounts, oldIndex, newIndex)
            setOrderedAccounts(neworderedAccounts)
            setNewOrderAction(neworderedAccounts)
        }        
    }

    return (
        <div className="w-full min-w-[300px] sm:min-w-[400px] lg:min-w-[600px] mt-10">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={orderedAccounts.map((socialAccount) => socialAccount.id)} strategy={verticalListSortingStrategy}>            
                    {
                    orderedAccounts.map((socialAccount) => (
                        <div key={socialAccount.id} className="flex items-center gap-2">
                            <SocialAccountEditableBox id={socialAccount.id} 
                                title={socialAccount.title} 
                                href={socialAccount.href} 
                                icon={socialAccount.socialNetworkIcon} 
                                color={socialAccount.socialNetworkColor}
                                isSocialIcon={socialAccount.isSocialIcon}
                                socialIconPosible={socialAccount.socialNetworkSocialIcon}
                            />
                        </div>
                    ))                    
                    }
                </SortableContext>
            </DndContext>
        </div>
    )
}
