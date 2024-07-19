'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const newUser = {
      username,
      password,
    };

    try {
      let currentUsers = localStorage.getItem('users');
      currentUsers = currentUsers ? JSON.parse(currentUsers) : [];

      const existingUser = currentUsers.find(user => user.username === username);
      if (existingUser) {
        toast.error('El usuario ya está registrado');
        return;
      }

      currentUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(currentUsers));

      toast.success('Registro exitoso');

      router.push('/intranet');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      toast.error('Error al registrar, por favor intenta de nuevo');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 pt-40 bg-black text-white"
      style={{ backgroundImage: "url('/fondo.gif')" }}>
      <Toaster />
      <div className="w-full max-w-md border-white border-4 border-double rounded-lg py-10 px-6 flex flex-col items-center text-center font-titulo">
        <span className="text-3xl mb-6 font-bold">Registro</span>

        <div className="w-full flex flex-col gap-4">
          <label htmlFor="usuario" className="text-lg">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded"
            required
          />

          <label htmlFor="password" className="text-lg">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded"
            required
          />

          <label htmlFor="password-confirm" className="text-lg">Confirmar contraseña:</label>
          <input
            type="password"
            id="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 p-2 w-full text-black rounded"
            required
          />
        </div>

        <button className="w-full py-3 mt-6 border-2 border-white rounded-lg font-bold text-xl hover:bg-white hover:text-black transition"
          onClick={handleRegister}>
          REGISTRARSE
        </button>

        <div className="mt-4 flex flex-col gap-2">
          <span>¿Ya tienes una cuenta?</span>
          <Link href='/login' className="text-[#DA4167] hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
