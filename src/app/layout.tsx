import SessionProvider from '@/components/SessionProvider'
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import getSession from '@/lib/auth'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'



export const metadata: Metadata = {
  title: 'Tinta Link, un servicio de tinta.wine',
  description: `
  Es un servicio gratuito de tinta.wine, la agencia de marketing enfocada en el mundo del vino.
  Reúne y comparte fácilmente todos tus enlaces vinculados al vino.
  `,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,    
  },
  authors: {name: "Raphael Carvalho", url: "https://rapha.uy"},
  publisher: "Tinta Wine",
  keywords: "tinta, wine, vino, link, enlaces, links, marketing, agencia, bodega, bodegas, vinos, vino"
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const session= await getSession()
  return (    
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
            <SessionProvider session={session}>
          

            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="p-1 sm:px-3 md:px-7 lg:px-12 relative flex flex-col min-h-screen mt-1 text-muted-foreground">
                <Header><Menu /></Header> 

                <div className="flex flex-col items-center flex-1">
                  {children}
                  <Analytics />
                  <Toaster />
                </div>

                <div className='flex justify-between font-bold mt-12 items-center'>
                  <Link href='/legal/terms'>
                    <Button variant="link" className='text-muted-foreground'>Términos y condiciones</Button>
                  </Link>

                  <Link href="https://tinta.wine" className=''>
                    <Image src="/logo_tinta.png" width={80} height={80} alt="Tinta logo" className="pb-[3px]" />
                  </Link>

                  <Link href='/legal/privacy'>
                    <Button variant="link" className='text-muted-foreground'>Política de privacidad</Button>
                  </Link>

                  </div> 
              </div>            
              <TailwindIndicator />
            </ThemeProvider>

            </SessionProvider>
        </body>
      </html>
    </>
  )
}
