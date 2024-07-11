'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavbarIntranet = () => {
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
    // Limpiar localStorage o realizar cualquier acción necesaria para cerrar sesión
    localStorage.removeItem('users');
    router.push('/login');
  };

  return (
      <nav className='fixed flex w-full p-8 bg-gray-900 z-50 text-white'>
        <div className='flex w-full font-titulo text-2xl hover:text-[#DA4167] hover:cursor-pointer'>
          <Link href='/intranet'>
            METODOS ESTADISTICOS
          </Link>
        </div>
        <div className='flex w-full items-center justify-end'>
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
      </nav>
  );
};

export default NavbarIntranet;
