'use client';

import Funciones from "../components/app/home/Funciones";
import Hero from "../components/app/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between w-full" 
      style={{ backgroundImage: "url('/fondo.gif')" }}>
          <Hero />
          <Funciones />
    </div>
  );
}
