import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user= await getCurrentUser()
  const role= user?.role

  if (role === "admin")
    redirect("/admin")
  else if (role === "user")
    redirect("/user")

  return (
    <div className='flex flex-col items-center gap-10 mt-20'>
      <p className='text-xl font-bold'>Reúne y comparte fácilmente todos tus enlaces vinculados al vino.</p>      

      <Link href="/login">
        <Button className="mt-20">Crea tu Tinta Link</Button>
      </Link>

    </div>
  )
}
