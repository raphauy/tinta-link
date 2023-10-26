import { getCurrentUser } from "@/lib/auth";
import NotAlowedPage from "../(auth)/unauthorized/page";
import { Metadata } from "next";

let userName = ""

export const metadata: Metadata = {
  title: `Tinta Link de ${userName}`,
  description: 'Tinta Link by tinta.wine',
}

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <NotAlowedPage message="You must be logged in." />
  }

  userName = currentUser.handle

  if (currentUser?.role !== "admin" && currentUser?.role !== "user") {
    return <NotAlowedPage message="Only user and admin role allowed." />
  }

  return (
    <>
      <div className="flex flex-grow w-full">
        <div className="flex flex-col items-center flex-grow p-1">{children}</div>
      </div>
    </>
  )
}
