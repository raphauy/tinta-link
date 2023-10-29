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
    <div className='flex flex-col items-center gap-5 mt-10'>
      <h1 className='text-2xl font-bold'>Tinta Link</h1>
      <h2 className='text-xl font-bold'>Reúne y comparte fácilmente todos tus enlaces vinculados al vino.</h2>

      <div className='border max-w-2xl p-6 rounded-lg mt-10 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 text-justify'>
        <h2 className="text-xl font-bold mb-2">¿Qué es Tinta Link?</h2>
        <p>Tinta Link es una aplicación web que permite a los usuarios compartir enlaces de forma rápida y sencilla.</p>

        <h2 className="text-xl font-bold mb-2 mt-8">¿Cómo funciona Tinta Link?</h2>
        <p>Para utilizar Tinta Link, debes registrarte con tu cuenta de Google o con un link de acceso enviado a tu casilla de correo.</p>
        <p>Una vez registrado, puedes agregar enlaces a tu perfil. Estos enlaces pueden ser de dos tipos:</p>
        <ul className="ml-5 list-inside list-disc">
          <li className="mt-2">- <span className="italic">Enlaces a redes sociales</span>: Facebook, Twitter, Instagram, etc.</li>
          <li className="mb-2">- <span className="italic">Enlaces a sitios web</span>: Sitio web personal, Tiendas, Blogs, etc.</li>
        </ul>
        <p className='mt-4'>Al crear tu cuenta y elegir tu idenificador, se creará tu <span className='font-bold'>Tinta Link</span>, un enlace personalizado para tu perfil. Este enlace
          es único, todos tus links pueden ser accedidos a través de este enlace.</p>
        <p className='mt-4'>Una vez que lo compartes, cualquier persona podrá acceder a tu perfil y ver los enlaces que has agregado.</p>
      </div>
      <Link href="/login">
        <Button className="mt-10">Crea tu Tinta Link</Button>
      </Link>

    </div>
  )
}
