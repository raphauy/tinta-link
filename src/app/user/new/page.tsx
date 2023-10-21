
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/auth";
import { isHandleAvailable, setHandleOnDB } from "@/services/userService";
import HandleForm from "./handle-form";
import { redirect } from "next/navigation";



export default async function NewUserPage() {
  const user= await getCurrentUser()
  if (!user) return <div>User not found</div>

  async function setHandleAction(data: FormData) {
    "use server"
    const handle = data.get("handle") as string
    console.log(handle)

    if (!handle) {
      toast({ title: "No se pudo crear el identificador"})
      return
    }

    if (!user) {
      toast({ title: "No se pudo crear el identificador"})
      return
    }

    const available= await isHandleAvailable(handle)
    if (!available) {
      toast({ title: "Identificador no disponible"})
      return
    }

    const updated= await setHandleOnDB(user.id, handle)

    if (!updated) {
      toast({ title: "No se pudo crear el identificador"})
      return
    } else {
      toast({ title: "Identificador creado"})
      redirect("/user")
    }    
  }

  async function isHandleAvailableAction(handle: string) {
    "use server"
    return await isHandleAvailable(handle)    

  }

  return (
    <HandleForm userId={user.id} setHandleAction={setHandleAction} isHandleAvailableAction={isHandleAvailableAction} />
  )
}
