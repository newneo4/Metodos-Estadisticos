'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  let isValidUser = null;
  let usuarios = null;

  if (typeof window !== 'undefined') {
    usuarios = JSON.parse(localStorage.getItem('users'));
  }

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (usuarios) {
      isValidUser = usuarios.some(usuario => usuario.username === username && usuario.password === password);
    }

    if (!isValidUser) {
      toast.error('Nombre de usuario o contraseña incorrectos');
      return;
    }

    toast.success('Inicio de sesión exitoso');
    router.push('/intranet');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-40 bg-black text-white"
      style={{ backgroundImage: "url('/fondo.gif')" }}>
      <Toaster />
      <div className="w-full max-w-md border-white border-4 border-double rounded-lg py-10 px-6 flex flex-col items-center text-center font-titulo">
        <span className="text-3xl mb-6 font-bold">¿Ya estás registrado?</span>

        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="usuario" className="text-lg mb-2">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded"
            required
          />

          <label htmlFor="password" className="text-lg mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded"
            required
          />
        </div>

        <span className="text-sm hover:text-[#DA4167] hover:cursor-pointer mb-6">
          ¿Olvidaste tu contraseña?
        </span>

        <button className="w-full py-3 border-2 border-white rounded-lg font-bold text-xl hover:bg-white hover:text-black transition"
          onClick={handleLogin}>
          INGRESAR
        </button>

        <div className="mt-4 flex flex-col gap-2">
          <span className="text-sm">¿No tienes una cuenta?</span>
          <Link href='/registro' className="text-[#DA4167] hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
