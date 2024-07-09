"use client";
import React from 'react'
import Cards from '../widgets/Cards';

const Funciones = () => {
  return ( 
    <div className='box-border w-full h-[75vh] block gap-10 p-10' id="metodos">
        <div className='w-full h-[15%]'>
            <span className='font-titulo text-3xl'>METODOS</span>
        </div>
        <div className='w-full h-[85%] flex items-center justify-center gap-20'>
            <Cards titulo={"Metodo 1"}/>
            <Cards titulo={"Metodo 2"}/>
            <Cards titulo={"Metodo 3"}/>
        </div>
    </div>
  )
}

export default Funciones