"use client";

import Image from "next/image";
import Link from "next/link";


export default function Logo() {

  return (
    <Link href="/">
      <div className="flex items-end">
        <Image src="/logo_tinta.png" width={90} height={90} alt="Tinta logo" className="pb-[3px]" />
        <p className="ml-1 text-3xl tracking-wider font-medium text-first-color">link</p>
      </div>
      <p className="text-sm -mt-3 text-right">beta</p>
    </Link>
  )
}
