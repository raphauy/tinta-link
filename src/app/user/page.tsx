import { getCurrentUser } from "@/lib/auth";
import { getSocialNetworkWebSite, getSocialNetworksNotSetted } from "@/services/socialNetworkService";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BioForm } from "./bio-form";
import LinkBox from "./link-box";
import { addSocialAccountAction, interchangeOrdersAction, setUserBioAction, setUserNameAction } from "./social-account-actions";
import SocialNetworkBox from "./social-network-box";
import SortableAccounts from "./sortable-accounts";
import SortableIcons from "./sortable-icons";
import { TitleForm } from "./title-form";
import UploadPicker from "./upload-picker";


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
    

    const socialNetworkWebSite= await getSocialNetworkWebSite()

    const href= process.env.NEXTAUTH_URL + "/" + handle

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="mb-10">
                <LinkBox href={href} />
            </div>
            <div className="flex items-center ml-5 gap-8 justify-center">
                {user.image ?
                    <div className="ml-14 w-20 h-20 overflow-hidden flex items-center rounded-full">
                        <Image className="w-20" src={user?.image} width={116} height={35} alt="User image" /> 
                    </div> 
                    :                
                    <p className="font-bold cursor-pointer hover:opacity-80 bg-gray-400 rounded-full text-white w-16 h-16 flex justify-center items-center text-4xl">{handle.substring(0,1).toUpperCase()}</p>
                }
                <UploadPicker />
            </div>

            <div className="text-2xl flex items-center ml-5">
                <TitleForm 
                    id={user.id} 
                    initialData={ { title: user.name ? user.name : "Tu nombre" }} 
                    update={setUserNameAction}
                />
            </div>

            <div className="text-2xl flex items-center ml-5">
                <BioForm
                    id={user.id} 
                    initialData={ { bio: user.bio ? user.bio : "Sin Bio" }} 
                    update={setUserBioAction}
                />
            </div>

            <SortableAccounts userId={user.id} interchangeOrders={interchangeOrdersAction}/>

            <SortableIcons userId={user.id} interchangeOrders={interchangeOrdersAction}/>

            <div className="w-full">
                {
                    socialNetworks.map((socialNetwork, index) => (
                        <SocialNetworkBox key={socialNetwork.id} userId={user.id} socialNetwork={socialNetwork} addSocialAccountAction={addSocialAccountAction} autofocus={index === 0} />
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
