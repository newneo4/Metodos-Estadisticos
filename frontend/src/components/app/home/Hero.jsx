import React from 'react';
import './Hero.css'; // Import the CSS file
import Image from 'next/image';

const Hero = () => {
  return (
    <div className='w-full h-[100vh] flex' id='hero'>
      <div className='w-1/2 h-full flex justify-start p-40'>
        <div className='flex flex-col gap-8'>
          <a className='text-5xl typing-effect' name="hero">BIENVENIDOS</a>
          <span className='text-3xl font-titulo text-[#DA4167]'>¿Estas listo para aprender los métodos estadísticos?</span>
          <span className='text-xl font-titulo'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, debitis excepturi. Facere perferendis, illum deserunt dolores quia quidem eaque qui, placeat fugit animi et cupiditate nostrum nulla ipsa culpa veritatis.
          </span>
        </div>
      </div>
      <div className='w-1/2 h-full flex items-center justify-center py-20'>
        <Image src="/home-image.jpeg" width={600} height={600} alt='Imagen home' className='size-10/12'/>
      </div>
    </div>
  );
}

export default Hero;
