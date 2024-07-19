"use client";
import React from 'react';
import Cards from '../widgets/Cards';

const Funciones = () => {
  return ( 
    <div className='box-border w-full h-[70vh] md:block flex flex-col gap-10 p-10 overflow-scroll md:overflow-hidden' id="metodos">
        <div className='w-full h-[15%]'>
            <span className='font-titulo text-3xl'>ALGUNOS DE NUESTROS MÉTODOS</span>
        </div>
        <div className='w-full h-[85%] grid md:grid-cols-3 gap-20'>
            <Cards 
              titulo="Método de Cameron" 
              descripcion="Sube tu archivo Excel y resuelve problemas estadísticos y probabilísticos utilizando el Método de Cameron. Nuestro programa te guiará paso a paso a través del análisis, permitiéndote obtener resultados precisos y confiables." 
              probar="Ver"
            />
            <Cards 
              titulo="MIL STD 414" 
              descripcion="Sube tu archivo Excel y aplica el estándar militar MIL STD 414 para inspección por variables. Nuestro programa te mostrará cómo realizar cada paso del proceso, asegurando que cumplas con los estándares de calidad exigidos." 
              probar="Ver"
            />
            <Cards 
              titulo="Método de Hotelling" 
              descripcion="Utiliza el Método de Hotelling para análisis multivariado y control de calidad. Sube tu archivo Excel y sigue nuestras instrucciones detalladas para cada etapa, facilitando la identificación de problemas y la mejora continua de tus procesos." 
              probar="Ver"
            />
        </div>
    </div>
  );
}

export default Funciones;