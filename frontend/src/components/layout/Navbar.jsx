'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const [user,setUser] = [""];
    const router = useRouter()

  return (
    <header>
        <nav className=' fixed flex w-full p-8 bg-black z-50 text-white h-auto'>
            <div className='flex w-full font-titulo text-2xl hover:text-[#DA4167] hover:cursor-pointer
            '>
                <Link href = '/'>
                    METODOS ESTADISTICOS
                </Link>
            </div>
            <div className='flex w-full items-center justify-end h-auto'>
                <ul className='flex gap-14 text-xl font-titulo w-full justify-end h-full'>
                    <li>
                        <a
                            href="#hero"
                            className="hover:text-[#DA4167] hover:cursor-pointer transition"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#metodos"
                            className="hover:text-[#DA4167] hover:cursor-pointer transition"
                        >
                            Metodos
                        </a>
                    </li>
                    <li className='hover:text-[#DA4167] hover:cursor-pointer'>
                        <Link href = '/login'>
                            {(user == [""]) ? "Iniciar Sesion" : user}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar