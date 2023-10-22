import { getReactIcon } from '@/lib/icons';
import Link from "next/link";
import React from "react";

interface Props {
    title: string
    href: string
    icon: string
    color: string
}
export default function SocialIconsBox({ title, href, icon, color }: Props) {
    const socialIcon= getReactIcon(icon)

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center p-1 hover:scale-110  transition-all ">
            <div className="flex text-center">
                <div>
                    {React.createElement(socialIcon, { className: `w-7 h-7`})}
                </div>
            </div>
        </Link>
    );
}