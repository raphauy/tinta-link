"use client"

import { LoadingSpinnerChico } from "@/components/loadingSpinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getReactIcon } from "@/lib/icons"
import React, { useState } from "react"
import { DataSocialNetwork } from "../admin/socialnetworks/(crud)/actions"

interface Props {
    userId: string
    socialNetwork: DataSocialNetwork
    autofocus?: boolean
    addSocialAccountAction: (data: FormData) => Promise<boolean>
}

export default function SocialNetworkBox({ userId, socialNetwork, autofocus, addSocialAccountAction }: Props) {

    const [nick, setNick] = useState("")
    const [loading, setLoading] = useState(false)
    const socialIcon= getReactIcon(socialNetwork.icon)
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

                    {React.createElement(socialIcon, { className: `w-7 h-7`, color: socialNetwork.color})}
                </div>

                <label className="ml-2 text-xs sm:text-base">{href}</label>
                <Input type="text" name="nick" value={nick} autoFocus={autofocus} className="pl-1 bg-white" onChange={(e) => setNick(e.target.value)}/>
                <Button className="ml-1 p-2" disabled={nick === ""}>
                    {loading ? <LoadingSpinnerChico /> : "Agregar"}
                </Button>
            </form>
        </div>
    )
}
