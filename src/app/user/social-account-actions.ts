"use server"

import { setUserBio, setUserName } from "@/services/userService"
import { revalidatePath } from "next/cache"
import { SocialAccountFormValues } from "./_update/social-account-form"
import { addSocialAccount, deleteSocialAccount, getSocialAccounts, interchangeOrders, setNewOrder, updateSocialAccount } from "@/services/socialAccountService"
import { redirect } from "next/navigation"


export type DataSocialAccount= {
    id: string
    title: string
    href: string
    order: number
    isSocialIcon: boolean
    userId: string
    socialNetworkId: string
    socialNetworkName: string
    socialNetworkIcon: string
    socialNetworkColor: string
    socialNetworkSocialIcon: boolean
}

export async function getSocialAccountsAction(userId: string, isSocialIcon: boolean): Promise<DataSocialAccount[]> {
    const socialAccounts= await getSocialAccounts(userId, isSocialIcon)
    const res= socialAccounts.map(sa => ({
        id: sa.id,
        title: sa.title,
        href: sa.href,
        order: sa.order,
        isSocialIcon: sa.socialIcon,
        userId: sa.userId,
        socialNetworkId: sa.socialNetworkId,
        socialNetworkName: sa.socialNetwork.name,
        socialNetworkIcon: sa.socialNetwork.icon,
        socialNetworkColor: sa.socialNetwork.color,
        socialNetworkSocialIcon: sa.socialNetwork.socialIcon
    }))

    return res
}

export async function addSocialAccountAction(data: FormData): Promise<boolean> {
    const userId= data.get("userId") as string
    const socialNetworkId= data.get("socialNetworkId") as string
    const nick= data.get("nick") as string

    const res= await addSocialAccount(userId, socialNetworkId, nick)
    if (!res) return false

    revalidatePath("/user")
    redirect(`/user?r=${Date.now()}`)
    
    return true
}


export async function setUserNameAction(id: string, newTitle: string): Promise<boolean> {  
    const updated= await setUserName(id, newTitle)

    if (!updated) return false

    revalidatePath(`/user`)
    
    return true
}

export async function setUserBioAction(id: string, newBio: string): Promise<boolean> {  
    const updated= await setUserBio(id, newBio)

    if (!updated) return false

    revalidatePath(`/user`)
    
    return true
}

export async function updateSocialAccountAction(id: string, data: SocialAccountFormValues): Promise<boolean> {  
    const updated= await updateSocialAccount(id, data.title, data.href, data.socialIcon)

    if (!updated) return false

    revalidatePath(`/user`)
    redirect(`/user?r=${Date.now()}`)

    return true
}

export async function deleteSocialAccountAction(id: string): Promise<boolean> {
    const deleted= await deleteSocialAccount(id)

    if (!deleted) return false

    revalidatePath(`/user`)
    redirect(`/user?r=${Date.now()}`)

    return true
}

export async function interchangeOrdersAction(id1: string, id2: string): Promise<boolean> {
    const updated= await interchangeOrders(id1, id2)

    if (!updated) return false

    revalidatePath(`/user`)
    
    return true
}

export async function setNewOrderAction(accounts: DataSocialAccount[]) {
    await setNewOrder(accounts)

    revalidatePath(`/user`)    
}