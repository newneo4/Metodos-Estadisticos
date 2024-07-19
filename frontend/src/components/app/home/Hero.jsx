import React from 'react';
import './Hero.css'; // Import the CSS file
import Image from 'next/image';

const Hero = () => {
  return (
    <div className='w-full md:h-[100vh] pt-40 pb-20 flex' id='hero'>
      <div className='md:w-1/2 h-full flex md:justify-start justify-center px-10 md:p-36 w-full items-center'>
        <div className='flex flex-col gap-8'>
          <a className='text-5xl typing-effect text-white' name="hero">BIENVENIDOS</a>
          <span className='text-3xl font-titulo text-[#DA4167]'>¿Estas listo para aprender los métodos estadísticos?</span>
          <span className='text-xl font-titulo text-white'>
            Explora nuestra plataforma para aprender y aplicar métodos estadísticos avanzados que te ayudarán a tomar decisiones más informadas y mejorar tus habilidades analíticas. Desde la estimación de tamaños de muestra hasta el análisis de series temporales, tenemos todo lo que necesitas para dominar la estadística.
          </span> 
        </div>
      </div>
      <div className='md:w-1/2 md:h-full md:flex items-center justify-center py-16 hidden'>
        <Image src="/home-image.jpeg" width={600} height={600} alt='Imagen home' className='size-10/12'/>
      </div>
    </div>
  );
}

export default Hero;
