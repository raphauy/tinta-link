"use client"


import { Button } from "@/components/ui/button"

import { LoadingCuadraditos, LoadingSpinnerChico, LoadingSvg } from "@/components/loadingSpinner"
import { toast } from "@/components/ui/use-toast"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props{
  id: string
  initialData: {
    bio: string
  }
  update: (id: string, newBio: string) => Promise<boolean>
}

export function BioForm({ id, initialData, update }: Props) {

  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(!isEditing)

  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState(initialData.bio)

  async function onSubmit() {
    setLoading(true)
    toggleEdit()
    const ok= await update(id, bio)
    
    if (ok)
      toast({title: "Bio editada" })
    else
      toast({title: "Error al editar la bio", variant: "destructive"})


    setLoading(false)
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit()
    }
  }


  return (
    <div>

            {
              isEditing ? (

                <div className="flex items-center justify-between gap-1 font-medium">
                  <textarea
                    rows={5}
                    cols={40}
                    name="bio"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    autoFocus
                    disabled={!isEditing}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    //onKeyDown={handleEnterKey}
                    onBlur={onSubmit}
                  />
                </div>

              ) : 
              loading ? (
                <div className="h-10">
                  <LoadingSpinnerChico />
                </div>
              ) : (
                <Button 
                  onClick={toggleEdit} 
                  variant="ghost" 
                  type="button" 
                  className="text-lg space-x-2">
                  <><p>{initialData.bio}</p> <Pencil className="w-5 h-5" /></>                      
                </Button>
              )
            }
    </div>
  )
}