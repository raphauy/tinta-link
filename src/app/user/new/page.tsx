
import { getCurrentUser } from "@/lib/auth";
import { isHandleAvailable, setHandleOnDB } from "@/services/userService";
import { redirect } from "next/navigation";
import HandleForm from "./handle-form";
import { revalidatePath } from "next/cache";



export default async function NewUserPage() {
  const user= await getCurrentUser()
  if (!user) return <div>User not found</div>

  console.log("handle: " + user.handle)
  if (user.handle) {
    redirect("/user")
  }

  async function setHandleAction(data: FormData): Promise<string> {
    "use server"
    const handle = data.get("handle") as string
    console.log(handle)

    if (!handle) {
      return "No se pudo crear el identificador"
    }

    if (!user) {
      return "No se pudo crear el identificador"
    }

    const available= await isHandleAvailable(handle)
    if (!available) {
      return "El identificador no está disponible"
    }

    const updated= await setHandleOnDB(user.id, handle)

    if (!updated) {
      return "No se pudo crear el identificador"
    } else {
      revalidatePath("/user")
      return "Identificador creado"
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
