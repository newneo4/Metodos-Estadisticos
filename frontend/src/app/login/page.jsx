'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center px-20 pt-28">
      <div className="w-[50vh] h-[90%] border-white border-4 border-double rounded-lg pt-8 flex flex-col items-center text-center font-titulo px-14">
        <span className="font-titulo text-4xl mb-10">¿Ya estás registrado?</span>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="usuario" className="text-xl mb-2">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-10 w-full"
          />

          <label htmlFor="password" className="text-xl mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-10 w-full"
          />
        </div>
        <span className="hover:text-[#DA4167] hover:cursor-pointer text-center mb-10">
          ¿Olvidaste tu contraseña?
        </span>
        <button className="border-double border-4 border-white rounded-lg w-60 h-16 font-bold text-xl hover:bg-white hover:text-black">
          INGRESAR
        </button>
        <div className="mt-2 flex gap-1">
          <span>¿No tienes una cuenta?</span>
          <Link href='/registro' className="hover:text-[#DA4167] hover:cursor-pointer">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
