import React from 'react';
import Image from 'next/image';
import './Hero.css';


const Hero = () => {
  return (
    <div className='w-full pt-40 min-h-screen flex flex-col md:flex-row items-center justify-center py-16 md:py-28 px-4 md:px-14' id='hero'>
      <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-10'>
      <a className='text-3xl md:text-5xl font-bold text-white mb-4 md:mb-8 typing-effect' name="hero">BIENVENIDOS</a>
        <span className='text-xl md:text-3xl font-titulo text-[#DA4167] mb-4 md:mb-6'>
          ¿Estás listo para aprender los métodos estadísticos?
        </span>
        <span className='text-base md:text-xl font-titulo text-white'>
          Explora nuestra plataforma para aprender y aplicar métodos estadísticos avanzados que te ayudarán a tomar decisiones más informadas y mejorar tus habilidades analíticas. Desde la estimación de tamaños de muestra hasta el análisis de series temporales, tenemos todo lo que necesitas para dominar la estadística.
        </span>
      </div>
      <div className='w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0'>
        <Image src="/home-image.jpeg" width={600} height={600} alt='Imagen home' className='w-3/4 h-auto size-40'/>
      </div>
    </div>
  );
}

export default Hero;
