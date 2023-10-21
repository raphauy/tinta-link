import { getCurrentUser } from "@/lib/auth";
import { getSocialAccounts } from "@/services/socialAccountService copy";
import { getSocialNetworkWebSite, getSocialNetworksNotSetted } from "@/services/socialNetworkService";
import Image from "next/image";
import { redirect } from "next/navigation";
import LinkBox from "./link-box";
import { addSocialAccountAction, getSocialAccountsAction, interchangeOrdersAction, setUserNameAction } from "./social-account-actions";
import SocialNetworkBox from "./social-network-box";
import SortableAccounts from "./sortable-accounts";
import { TitleForm } from "./title-form";
import UserImageBox from "./user-image-box";


export default async function UserPage() {

    const user= await getCurrentUser()
    if (!user) return <div>User not found</div>
    const handle= user.handle

    if (handle === null)
        redirect("/user/new")

    const socialNetworks= await getSocialNetworksNotSetted(user.id)
    
    // remove from socialNetworks the socialNetworkWebSite who has an icon of "BsGlobe"
    const indexOfSocialNetworkWebSite= socialNetworks.findIndex((socialNetwork) => socialNetwork.icon === "BsGlobe")
    if (indexOfSocialNetworkWebSite !== -1)
        socialNetworks.splice(indexOfSocialNetworkWebSite, 1)    
    

    const socialAccounts= await getSocialAccounts(user.id)
    const dataSocialAccounts= await getSocialAccountsAction(user.id)

    const socialNetworkWebSite= await getSocialNetworkWebSite()

    const href= process.env.NEXTAUTH_URL + "/" + handle

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="mb-10">
                <LinkBox href={href} />
            </div>
            {user.image ?
                    <Image className="rounded-full w-20" src={user.image} width={116} height={35} alt="User image" /> : 
                    <p className="font-bold cursor-pointer hover:opacity-80 bg-gray-400 rounded-full text-white w-16 h-16 flex justify-center items-center text-4xl">{handle.substring(0,1).toUpperCase()}</p>
                }

            <div className="text-2xl flex items-center ml-5">
                <TitleForm 
                    id={user.id} 
                    initialData={ { title: user.name ? user.name : "Tu nombre" }} 
                    update={setUserNameAction}
                />
            </div>

            <SortableAccounts userId={user.id} interchangeOrders={interchangeOrdersAction}/>

            <div className="w-full">
                {
                    socialNetworks.map((socialNetwork) => (
                        <SocialNetworkBox key={socialNetwork.id} userId={user.id} socialNetwork={socialNetwork} addSocialAccountAction={addSocialAccountAction} />
                    ))                    
                }
                {
                    socialNetworkWebSite && (
                        <SocialNetworkBox key={socialNetworkWebSite.id} userId={user.id} socialNetwork={socialNetworkWebSite} addSocialAccountAction={addSocialAccountAction} />
                    )
                }
            </div>
        </div>
    )
}
