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
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';



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
  keywords: "tinta, wine, vino, link, enlaces, links, marketing, agencia, bodega, bodegas, vinos, vino, bodegas, bodega, vinos, vino, marketing, agencia, enlaces, li"
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = headers();
  const url = headersList.get("x-url") || "";
  const path= "/" + url.split("/")[3]

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

                <div className='flex justify-center font-bold mb-2 mt-12 items-center'>

                {
                  (path.startsWith("/user") || path === "/") ?
                  <>
                    <p className='whitespace-nowrap'>{"Creado por "}</p>
                    <Link href='https://tinta.wine' target='_blank'>
                      <Button className='p-1 font-bold text-base' variant="link">tinta.wine</Button>
                    </Link>
                    <p className='whitespace-nowrap'>{" - Desarrollado por"}</p>                    
                    <Link href='https://rapha.uy' target='_blank'>
                      <Button className='p-1 font-bold text-base' variant="link">rapha.uy</Button>
                    </Link>
                  </> :
                    <Link href="https://tinta.wine" className='mb-8'>
                      <Image src="/logo_tinta.png" width={80} height={80} alt="Tinta logo" className="pb-[3px]" />
                    </Link>
                
              }
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
