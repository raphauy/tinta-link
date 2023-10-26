import { Button } from "@/components/ui/button";
import { getSocialAccounts } from "@/services/socialAccountService";
import { getUserByHandle } from "@/services/userService";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SocialAccountBox from "./social-account-box";
import SocialIconsBox from "./social-icons-box";
import { Metadata } from "next";

interface Props {
    params: {
        handle: string
    }
}
export default async function HandlePage({ params: { handle } }: Props) {

    if (handle === null)
        redirect("/user/new")

    const user= await getUserByHandle(handle)
    if (!user) redirect("/")

    const socialAccounts= await getSocialAccounts(user.id, false)
    const socialIcons= await getSocialAccounts(user.id, true)

    console.log(handle)    

    return (
        <div className="mt-10 flex flex-col gap-4 items-center">            
            {user.image ?                         
                <Image className="rounded-full w-20" src={user?.image} width={116} height={35} alt="User image" /> : 
                <p className="font-bold cursor-pointer hover:opacity-80 bg-gray-400 rounded-full text-white w-16 h-16 flex justify-center items-center text-4xl">{handle.substring(0,1).toUpperCase()}</p>
            }

            <div className="text-2xl flex items-center font-bold">
                <h1>{user.name ? user.name : user.handle}</h1>
            </div>

            {user.bio &&
                <div className="text-lg flex items-center max-w-md text-center">
                    <h2>{user.bio}</h2>
                </div>
            }

            <div className="w-full min-w-[300px] sm:min-w-[400px] lg:min-w-[600px] mt-10">
                {
                    socialAccounts.map((socialAccount) => (
                        <div key={socialAccount.id} className="flex items-center gap-2">
                            <SocialAccountBox title={socialAccount.title} href={socialAccount.href} icon={socialAccount.socialNetwork.icon} color={socialAccount.socialNetwork.color} />
                        </div>
                    ))                    
                }
            </div>
            <div className="flex gap-2 text-gray-800 mt-2">
                {
                    socialIcons.map((socialAccount) => (
                        <div key={socialAccount.id} className="flex items-center gap-2">
                            <SocialIconsBox title={socialAccount.title} href={socialAccount.href} icon={socialAccount.socialNetwork.icon} color={socialAccount.socialNetwork.color} />
                        </div>
                    ))                    
                }
            </div>

            <Link href="/login">
                <Button className="mt-20">Crea tu Tinta Link</Button>
            </Link>
        </div>
    )
}

export async function generateMetadata({ params: { handle } }: Props): Promise<Metadata> {
   
    return {
        title: `Enlaces de ${handle} en Tinta Link`,
    }
  }