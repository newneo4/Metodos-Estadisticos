'use client'
import Cards from '../../components/app/widgets/Cards'
import React from 'react'
import { useRouter } from 'next/navigation'

const Intranet = () => {
    const router = useRouter();

    const handleRouters = (opcion) =>{
        switch(opcion){
            case 1:
                router.push('intranet/cameron')
                break;
            case 2:
                router.push('intranet/mil')
                break;
            case 3:
                router.push('intranet/hotelling')
                break;
            case 4:
                router.push('intranet/taguchi')
                break;
        }
    }

  return (
    <div className='flex h-full w-full flex-col bg-black px-10 gap-10'>
        <span className='text-3xl'>BIENVENIDO !!</span>
        <div className='my-auto'>
            <span className='text-2xl'>METODOS</span>
            <div className='grid md:grid-cols-3 w-full justify-around m-auto'>
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
                    accion={() =>handleRouters(4)}
                 />
                 <Cards
                    titulo={"Metodo 5"}
                    descripcion={"Descripción del Método 5"}  
                    probar={"seleccionar"}   
                 />
                 <Cards
                    titulo={"Metodo 6"}
                    descripcion={"Descripción del Método 6"}
                    probar={"seleccionar"}   
                 />
            </div>
        </div>
    </div>
  )
}

export default Intranet
