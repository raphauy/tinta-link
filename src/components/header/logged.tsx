import getSession from "@/lib/auth"
import PopOver from "./PopOver"
import PopOverUserHandler from "./PopOverUserHandler"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function Logged() {

    const session= await getSession()

    if (!session) return (
        <Link href="/login"><Button variant="outline">Login</Button></Link>
    )

    const { user } = session

    const avatar= <p>{user.email}</p>

    return (<PopOver trigger={avatar} body={<PopOverUserHandler />} />)
}
