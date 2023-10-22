import * as BsReactIcons from 'react-icons/bs'
import * as FaReactIcons from 'react-icons/fa'
import * as RiReactIcons from 'react-icons/ri'

export function getXIcon(size?: string) {
    const height= size ? size : "1.7em"
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 512 512">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
        </svg>        
    )    
}

export function getReactIcon(icon: string) {  
    

    let socialIcon= null
    if (icon.startsWith("Fa")) {
        // @ts-ignore
        socialIcon= FaReactIcons[icon]
    } else if (icon.startsWith("Bs")) {
        // @ts-ignore
        socialIcon= BsReactIcons[icon]
    } else if (icon.startsWith("Ri")) {
        // @ts-ignore
        socialIcon= RiReactIcons[icon]
    }

    console.log("icon", icon, socialIcon);
    

    return socialIcon
    
}