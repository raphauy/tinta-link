"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getDataUser } from "../admin/users/(crud)/actions"

interface Props {
    userId: string
}
export default function UserImageBox({ userId}: Props) {

    const [userImage, setUserImage] = useState("")
    const [handle, setHandle] = useState("")
    const searchParams= useSearchParams()

    useEffect(() => {
        async function fetchUser() {
            const user= await getDataUser(userId)
            
            if (!user) return
            user.imagen && setUserImage(user.imagen)
            user.handle && setHandle(user.handle)
        }
        fetchUser()
    }, [userId, searchParams])
    

    return (
        <>
                {userImage ?
                    <Image className="rounded-full w-20" src={userImage} width={116} height={35} alt="User image" /> : 
                    <p className="font-bold cursor-pointer hover:opacity-80 bg-gray-400 rounded-full text-white w-16 h-16 flex justify-center items-center text-4xl">{handle.substring(0,1).toUpperCase()}</p>
                }

        </>
    )
}
