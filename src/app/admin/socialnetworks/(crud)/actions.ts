"use server"

import getSocialNetworks, { createSocialNetwork, deleteSocialNetwork, getSocialNetwork, updateSocialNetwork } from "@/services/socialNetworkService";
import { SocialNetwork } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SocialNetworkFormValues } from "./social-form";

export type DataSocialNetwork = {
    id: string
    name: string
    icon: string
    color: string
    hrefTemplate: string
    order: number
    socialIcon: boolean
    placeHolder: string
}
      

export async function getDataSocialNetwork(socialnetworkId: string): Promise<DataSocialNetwork | null>{
    const socialnetwork= await getSocialNetwork(socialnetworkId)
    if (!socialnetwork) return null

    const data: DataSocialNetwork= await getData(socialnetwork)
    return data
}

export async function getData(socialnetwork: SocialNetwork): Promise<DataSocialNetwork>{
    const data: DataSocialNetwork= {
        id: socialnetwork.id,
        name: socialnetwork.name,
        icon: socialnetwork.icon,
        color: socialnetwork.color,
        hrefTemplate: socialnetwork.hrefTemplate,
        order: socialnetwork.order,
        socialIcon: socialnetwork.socialIcon,
        placeHolder: socialnetwork.placeHolder
    }
    return data
}

export async function getDataSocialNetworks() {
    const socialnetworks= await getSocialNetworks()

    const data: DataSocialNetwork[]= await Promise.all(socialnetworks.map(async (socialnetwork)=> await getData(socialnetwork)))
    
    return data    
}


export async function create(data: SocialNetworkFormValues): Promise<SocialNetwork | null> {       
    const created= await createSocialNetwork(data)

    console.log(created);

    revalidatePath(`/admin/socialnetworks`)

    return created
}
  
export async function update(socialnetworkId: string, data: SocialNetworkFormValues): Promise<SocialNetwork | null> {  
    const edited= await updateSocialNetwork(socialnetworkId, data)    

    revalidatePath(`/admin/socialnetworks`)
    
    return edited
}


export async function eliminate(socialnetworkId: string): Promise<SocialNetwork | null> {    
    const deleted= await deleteSocialNetwork(socialnetworkId)

    revalidatePath(`/admin/socialnetworks`)

    return deleted
}

