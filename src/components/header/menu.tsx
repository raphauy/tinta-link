
import { getCurrentUser } from "@/lib/auth";
import { ThemeToggle } from "../shadcn/theme-toggle";
import MenuAdmin from "./menu-admin";
import { publicMenu } from "./menu-data";
import MenuComponent from "./menu-item";

export default async function Menu() {
    
    const user= await getCurrentUser()

    return (
        <div className="flex justify-between items-center">
            <div className="">
                {
                    user?.role === "admin" &&
                    <MenuAdmin />
                }                
            </div>
            
            <div>
                <MenuComponent menu={publicMenu} />
            </div>

            <div>
                <ThemeToggle />
            </div>
        </div>
    )
    
}
