import { getReactIcon } from '@/lib/icons';
import Link from "next/link";
import React from "react";

interface Props {
    title: string
    href: string
    icon: string
    color: string
}
export default function SocialAccountBox({ title, href, icon, color }: Props) {
    const socialIcon= getReactIcon(icon)

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center p-1 w-full rounded-md hover:scale-105 bg-slate-50 transition-all border shadow-md mb-3 max-w-3xl">
            <div className="flex text-center w-full">
                <div>
                    {React.createElement(socialIcon, { className: `w-7 h-7`, color})}
                </div>
                <div className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
                    {title}
                </div>
            </div>
        </Link>
    );
}