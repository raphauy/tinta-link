import { getCurrentUser } from '@/lib/auth'
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
      <p className='text-2xl font-bold'>Landing Page</p>      
    </div>
  )
}
