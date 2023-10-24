"use client"

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { DataSocialAccount, getSocialAccountsAction, setNewOrderAction } from "./social-account-actions";
import SocialAccountEditableBox from "./social-account-editable-box";
import { usePathname, useSearchParams } from "next/navigation";
import SocialIconEditableBox from "./social-icon-editable-box";

interface Props {
    userId: string
    interchangeOrders: (id1: string, id2: string) => Promise<boolean>
}

export default function SortableIcons({ userId, interchangeOrders}: Props) {

    const [orderedAccounts, setOrderedAccounts] = useState([] as DataSocialAccount[])
    const searchParams= useSearchParams()
    
    useEffect(() => {
        async function getSocialAccounts() {
            const socialAccounts= await getSocialAccountsAction(userId, true)
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
        <div className="flex gap-2">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={orderedAccounts.map((socialAccount) => socialAccount.id)} strategy={horizontalListSortingStrategy}>            
                    {
                    orderedAccounts.map((socialAccount) => (
                        <div key={socialAccount.id} className="">
                            <SocialIconEditableBox id={socialAccount.id} 
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
