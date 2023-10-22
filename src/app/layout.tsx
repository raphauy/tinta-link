import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import SessionProvider from '@/components/SessionProvider'
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { cn } from '@/lib/utils'
import getSession from '@/lib/auth'
import { fontSans } from '@/lib/fonts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { headers } from 'next/headers'
import Image from 'next/image'



export const metadata: Metadata = {
  title: 'Tinta Link',
  description: 'Tinta Link by tinta.wine',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },  
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
              <div className="container relative flex flex-col min-h-screen mt-1 text-muted-foreground">
                <Header><Menu /></Header> 

                <div className="flex flex-col items-center flex-1">
                  {children}
                  <Toaster />
                </div>

                <div className='flex justify-center font-bold mb-2 mt-12 items-center'>

                {
                  (path.startsWith("/user") || path === "/") ?
                  <>
                    {"Creado por "}
                    <Link href='https://tinta.wine' target='_blank'>
                      <Button className='p-1 font-bold text-base' variant="link">tinta.wine</Button>
                    </Link>
                    {"- Desarrollado por"}
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
