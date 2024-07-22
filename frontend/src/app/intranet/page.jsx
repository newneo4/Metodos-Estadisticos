// src/app/intranet/page.js
'use client';

import Cards from '../../components/app/widgets/Cards';
import IntranetLayout from './layout';
import React from 'react';
import { useRouter } from 'next/navigation';

const Intranet = () => {
  const router = useRouter();

  const handleRouters = (opcion) => {
    switch (opcion) {
      case 1:
        router.push('intranet/cameron');
        break;
      case 2:
        router.push('intranet/mil');
        break;
      case 3:
        router.push('intranet/hotelling');
        break;
      case 4:
        router.push('intranet/taguchi');
        break;
      case 5:
        router.push('intranet/muestra');
        break;
      case 6:
        router.push('intranet/sigma');
        break;
      default:
        break;
    }
  };

  return (
      <div className='flex min-h-screen w-full flex-col bg-gray-800  opacity-80 px-20 pt-40 md:pt-28'>
        <div className='my-auto'>
          <span className='text-2xl font-titulo'>METODOS</span>
          <div className='grid md:grid-cols-2 w-full justify-around m-auto lg:grid-cols-3'>
            <Cards
              titulo={"Metodo de Cameron"}
              descripcion={"Este método proporciona una forma eficaz de analizar y mejorar los procesos industriales."}
              probar={"seleccionar"}
              accion={() => handleRouters(1)}
            />
            <Cards
              titulo={"Metodo de MIL STD 414"}
              descripcion={"Este método establece criterios estadísticos para la aceptación de productos y componentes."}
              probar={"seleccionar"}
              accion={() => handleRouters(2)}
            />
            <Cards
              titulo={"Metodo de Hotelling"}
              descripcion={"El Método de Hotelling se utiliza para analizar y optimizar múltiples variables simultáneamente."}
              probar={"seleccionar"}
              accion={() => handleRouters(3)}
            />
            <Cards
              titulo={"Filosofia de Taguchi"}
              descripcion={"La Filosofía de Taguchi busca minimizar la variabilidad en el diseño y manufactura de productos."}
              probar={"seleccionar"}
              accion={() => handleRouters(4)}
            />
            <Cards
              titulo={"Calculadora de muestra"}
              descripcion={"Herramienta sencilla para determinar el tamaño de muestra necesario para estudios de proporciones o promedios. Ajusta los parámetros y obtén resultados precisos para tu investigación"}
              probar={"seleccionar"}
              accion={() => handleRouters(5)}
            />
            <Cards
              titulo={"Metodo de Seis Sigma"}
              descripcion={"El método Seis Sigma mejora la calidad de los procesos reduciendo defectos y variabilidad mediante técnicas estadísticas y la metodología DMAIC."}
              probar={"seleccionar"}
              accion={() => handleRouters(6)}
            />
          </div>
        </div>
      </div>
  );
};

export default Intranet;
