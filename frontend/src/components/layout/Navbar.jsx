'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { React, useState } from 'react';

const Navbar = () => {
    const [user, setUser] = useState(""); // Inicializar el estado correctamente
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);
    
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const scrollToSectionOrRedirect = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/'); // Redirige a la página de inicio si la sección no está disponible
        }
        setMenuVisible(false); // Cerrar el menú después de hacer clic
    };

    return (
        <header>
            <nav className='fixed flex w-full p-8 bg-gray-900 z-50 text-white h-auto'>
                <div className='flex w-full font-titulo text-2xl hover:text-[#DA4167] hover:cursor-pointer'>
                    <Link href='/'>
                        STATNEXUS
                    </Link>
                </div>
                <div className='md:flex w-full items-center justify-end h-auto hidden'>
                    <ul className='flex gap-14 text-xl font-titulo w-full justify-end h-full'>
                        <li>
                            <a
                                href="#hero"
                                className="hover:text-[#DA4167] hover:cursor-pointer transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSectionOrRedirect('hero');
                                }}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#metodos"
                                className="hover:text-[#DA4167] hover:cursor-pointer transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSectionOrRedirect('metodos');
                                }}
                            >
                                Metodos
                            </a>
                        </li>
                        <li className='hover:text-[#DA4167] hover:cursor-pointer'>
                            <Link href='/login'>
                                {user === "" ? "Iniciar Sesion" : user}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='flex mx-3 md:hidden'>
                    <button onClick={toggleMenu}>
                        <Image src="/menu.svg" width={40} height={40} />
                    </button>
                </div>
            </nav>

            {/* Menú móvil */}
            {menuVisible && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-900 text-white z-40 flex flex-col items-center justify-center md:hidden'>
                    <button 
                        onClick={toggleMenu}
                        className='absolute top-4 right-4 text-2xl'
                    >
                        &times; {/* Este es el ícono de cierre */}
                    </button>
                    <ul className='flex flex-col items-center gap-6 text-xl font-titulo'>
                        <li>
                            <a
                                href="#hero"
                                className="hover:text-[#DA4167] hover:cursor-pointer transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSectionOrRedirect('hero');
                                }}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#metodos"
                                className="hover:text-[#DA4167] hover:cursor-pointer transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSectionOrRedirect('metodos');
                                }}
                            >
                                Metodos
                            </a>
                        </li>
                        <li className='hover:text-[#DA4167] hover:cursor-pointer'>
                            <Link href='/login' onClick={toggleMenu}>
                                {user === "" ? "Iniciar Sesion" : user}
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Navbar;
