"use client"

import { LoadingSpinnerChico } from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Ban, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  userId: string
  setHandleAction: (data: FormData) => Promise<string>
  isHandleAvailableAction: (handle: string) => Promise<boolean>
}

export default function HandleForm({ userId, setHandleAction, isHandleAvailableAction }: Props) {

  const [handle, setHandle] = useState("")
  const [handleValid, setHandleValid] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkAvailability(handle: string) {
      if (handle !== "") {
        const valid= await isHandleAvailableAction(handle)
        setHandleValid(valid)
      } else {
        setHandleValid(false)
      }
    }

    checkAvailability(handle)
  }, [handle, isHandleAvailableAction])
  
  function handleSubmit() {
    setLoading(true)
    toast({ title: "Aguarde..."})
    
    const formData= new FormData()
    formData.append("handle", handle)
    async function setHandle() {
      const res= await setHandleAction(formData)
      toast({ title: res})
      setLoading(false)
    }
    setHandle()    
  }


  return (
    <div className="mt-10 flex flex-col items-center">
      <p>Por favor elige un identificador para armar tu URL</p>

      <div className="mt-5 p-5 border rounded-md">
        <form action={handleSubmit} className="flex items-center gap-1">        
          <label>https://tinta.link/</label>
          <Input type="text" name="handle" autoFocus className="pl-1" value={handle} onChange={(e) => setHandle(e.target.value)} />
          <Button className="w-36 ml-1" disabled={!handleValid}>{loading ? <LoadingSpinnerChico /> : "Crear"}</Button>
        </form>

        <div className="mt-4 flex justify-center font-bold">
          {handleValid ? 
            <p className="text-green-600 flex gap-1"><CheckCircle2 />{handle} está disponible</p>
            : 
            handle !== "" && handle !== "user" && <p className="text-red-600 flex gap-1">no disponible<Ban /></p>
          }
        </div>
      </div>
    </div>
  )
}
