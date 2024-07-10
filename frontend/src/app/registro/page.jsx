'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter()

  const handleRegister = ()=>{
    router.push('/intranet')
  }

  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center px-20 pt-28 bg-black text-white"
    style={{ backgroundImage: "url('/fondo.gif')" }}>
      <div className="box-border w-[50vh] h-[90%] border-white border-4 border-double rounded-lg py-20 flex flex-col items-center text-center font-titulo px-14 justify-evenly">
        <span className="font-titulo text-4xl mb-10">Registro</span>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="usuario" className="text-xl mb-2">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-5 w-full text-black"
          />

          <label htmlFor="password" className="text-xl mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full text-black"
          />

          <label htmlFor="password-confirm" className="text-xl mb-2">Confirmar contraseña:</label>
          <input
            type="password"
            id="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-5 w-full text-black"
          />
        </div>
        <button className="border-double border-4 border-white rounded-lg w-60 h-16 font-bold text-xl hover:bg-white hover:text-black"
          onClick={() => handleRegister()}>
          REGISTRARSE
        </button>
        <div className="mt-2 flex gap-1 w-full">
          <span>¿Ya tienes una cuenta?</span>
          <Link href='/login' className="hover:text-[#DA4167] hover:cursor-pointer">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
