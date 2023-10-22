"use client"

import { Input } from "@/components/ui/input"
import { DataSocialNetwork } from "../admin/socialnetworks/(crud)/actions"
import { Button } from "@/components/ui/button"
import * as ReactIcons from 'react-icons/bs'
import React, { useState } from "react"
import { getXIcon } from "@/lib/icons"
import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Wine } from "lucide-react"

interface Props {
    userId: string
    socialNetwork: DataSocialNetwork
    addSocialAccountAction: (data: FormData) => Promise<boolean>
}

export default function SocialNetworkBox({ userId, socialNetwork, addSocialAccountAction }: Props) {

    const [nick, setNick] = useState("")
    const [loading, setLoading] = useState(false)
    // @ts-ignore
    const socialIcon= ReactIcons[socialNetwork.icon]
    const hrefTemplate= socialNetwork.hrefTemplate
    const href= hrefTemplate.substring(0, hrefTemplate.indexOf("{nick}"))

    function handleSubmit() {
        setLoading(true)
        
        const formData= new FormData()
        formData.append("nick", nick)
        formData.append("userId", userId)
        formData.append("socialNetworkId", socialNetwork.id)
        setNick("")
        async function addSocialAccount() {
            await new Promise(resolve => setTimeout(resolve, 100))
            await addSocialAccountAction(formData)
            setLoading(false)
        }
        addSocialAccount()
    }
    return (
        <div className="mt-5 p-3 bg-slate-50 border rounded-md">
            <form action={handleSubmit} className="flex items-center gap-1">
                <div>

                {
                    socialNetwork.icon === "BsTwitter" ?
                        getXIcon("1.8em") :
                    socialNetwork.icon === "Wine" ?
                        <Wine className="w-8 h-8" color={socialNetwork.color}/> :
                        React.createElement(socialIcon, { size: "25", color: socialNetwork.color})
                }
                </div>

                <label className="ml-2 text-xs sm:text-base">{href}</label>
                <Input type="text" name="nick" value={nick} autoFocus className="pl-1 bg-white" onChange={(e) => setNick(e.target.value)}/>
                <Button className="ml-1 p-2" disabled={nick === ""}>
                    {loading ? <LoadingSpinnerChico /> : "Agregar"}
                </Button>
            </form>
        </div>
    )
}
