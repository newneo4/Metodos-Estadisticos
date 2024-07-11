'use client'

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
    <div className="flex h-screen w-full flex-col items-center justify-center px-20 pt-28 bg-black text-white"
      style={{ backgroundImage: "url('/fondo.gif')" }}>
      <Toaster />
      <div className="box-border w-96 h-[90%] border-white border-4 border-double rounded-lg py-20 flex flex-col items-center text-center font-titulo px-14 justify-evenly">
        <span className="font-titulo text-4xl mb-10">Registro</span>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="usuario" className="text-xl mb-2">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-5 w-full text-black"
            required
          />

          <label htmlFor="password" className="text-xl mb-2">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 w-full text-black"
            required
          />

          <label htmlFor="password-confirm" className="text-xl mb-2">Confirmar contraseña:</label>
          <input
            type="password"
            id="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-5 w-full text-black"
            required
          />
        </div>

        <button className="border-double border-4 border-white rounded-lg w-60 h-16 font-bold text-xl hover:bg-white hover:text-black"
          onClick={handleRegister}>
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
