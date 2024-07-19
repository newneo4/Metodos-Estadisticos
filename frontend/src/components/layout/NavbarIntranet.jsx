'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NavbarIntranet = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  // Obtener datos del usuario desde localStorage si están disponibles
  let user_aux = null;
  if (typeof window !== 'undefined') {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && storedUsers.length > 0) {
      user_aux = storedUsers[storedUsers.length - 1]; // Obtener el último usuario almacenado
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('users');
    router.push('/login');
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header>
      <nav className='fixed flex w-full p-8 bg-gray-900 z-50 text-white'>
        <div className='flex w-full font-titulo text-2xl hover:text-[#DA4167] hover:cursor-pointer'>
          <Link href='/intranet'>
            METODOS ESTADISTICOS
          </Link>
        </div>
        <div className='md:flex w-full items-center justify-end hidden'>
          <ul className='flex gap-14 text-xl font-titulo w-full justify-end h-full'>
            {user_aux ? (
              <li className='hover:text-[#DA4167] hover:cursor-pointer'>
                ¡Hola, {user_aux.username}!
              </li>
            ) : null}
            <li className='hover:text-[#DA4167] hover:cursor-pointer'>
              <a onClick={handleLogout}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
        <div className='flex mx-3 md:hidden'>
          <button onClick={toggleMenu}>
            <Image src="/menu.svg" width={40} height={40} alt="Menu" />
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
            {user_aux ? (
              <li className='text-center'>
                ¡Hola, {user_aux.username}!
              </li>
            ) : null}
            <li className='hover:text-[#DA4167] hover:cursor-pointer'>
              <a onClick={() => { handleLogout(); toggleMenu(); }}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavbarIntranet;
