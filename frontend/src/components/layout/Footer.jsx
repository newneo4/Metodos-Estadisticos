import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 w-full mt-24 h-auto">
      <div className="mx-20 px-4 flex flex-col md:flex-row items-center">
        <div className="mb-4 md:mb-0 flex w-1/3 justify-start">
          <span className="text-lg font-semibold">Mi Empresa</span>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0 w-1/3 justify-center">
          <Link href="#" className='hover:text-[#DA4167] hover:cursor-pointer'>
            Sobre Nosotros
          </Link>
          <Link href="#" className='hover:text-[#DA4167] hover:cursor-pointer'>
            Servicios
          </Link>
          <Link href="#" className='hover:text-[#DA4167] hover:cursor-pointer'>
            Contacto
          </Link>
        </div>
        <div className='w-1/3 flex justify-end'>
          <span className="text-sm">&copy; 2024 Mi Empresa. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
