
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { create, getDataSocialNetworks, update } from "./(crud)/actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { SocialNetworkDialog } from "./(crud)/social-dialog"
 
export default async function WinesPage() {
  
  const socialnetworks= await getDataSocialNetworks()

  const addTrigger= (<Button><PlusCircle size={22} className="mr-2"/>Add</Button>)

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <SocialNetworkDialog create={create} update={update} title="Add Social Network" trigger={addTrigger}/>
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={socialnetworks} />      
      </div>
    </div>
)
}
