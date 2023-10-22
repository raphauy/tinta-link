import { headers } from "next/headers";

import { ReactNode } from "react"
import Logged from "./logged"
import Logo from "./logo"
import { getCurrentUser } from "@/lib/auth"

interface Props {  
    children: ReactNode
}
  
export default async function Header({ children }: Props) {

    const headersList = headers();
    const url = headersList.get("x-url") || "";
    const path= "/" + url.split("/")[3]

    if (
        !path.startsWith("/user") && 
        !path.startsWith("/admin") &&
        !path.startsWith("/emailverify") &&
        !path.startsWith("/login") &&
        !path.startsWith("/logout") &&
        !path.startsWith("/legal") &&
        !path.startsWith("/unauthorized")
    ) 
        return null

    return (
        <div className="flex items-center gap-2 pb-1 border-b border-first-color/50">
            <div>
                <Logo />
            </div>

            <div className="flex-1">                                
                {children}
            </div>
            
            <div>
                <Logged />
            </div>
        </div>
    )
}
