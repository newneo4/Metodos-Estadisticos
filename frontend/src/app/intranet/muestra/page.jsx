'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CalculationPage = () => {
  const [data, setData] = useState({
    Z: '',
    p: '',
    q: '',
    E: '',
    N: '',
    D: ''
  });
  const [results, setResults] = useState(null); // Estado para almacenar los resultados del método
  const [method, setMethod] = useState('proporciones_infinita'); // Estado para seleccionar el método

  // Función para manejar el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Función para calcular los métodos
  const calculateMethod = () => {
    const { Z, p, q, E, N, D } = data;

    // Convertir valores a números
    const z = parseFloat(Z);
    const pValue = parseFloat(p);
    const qValue = parseFloat(q);
    const EValue = parseFloat(E);
    const NValue = parseFloat(N);
    const DValue = parseFloat(D);

    let result = {};

    switch (method) {
      case 'proporciones_infinita':
        if (!z || !pValue || !qValue || !EValue) {
          toast.error('Por favor, complete todos los campos.');
          return;
        }
        const n = Math.pow(z, 2) * pValue * qValue / Math.pow(EValue, 2);
        result = { n: n.toFixed(2) };
        break;
        
      case 'proporciones_finite':
        if (!z || !pValue || !qValue || !EValue || !NValue) {
          toast.error('Por favor, complete todos los campos.');
          return;
        }
        const nFinite = (Math.pow(z, 2) * pValue * qValue) / (Math.pow(EValue, 2) + ((Math.pow(z, 2) * pValue * qValue) / NValue));
        result = { n: nFinite.toFixed(2) };
        break;

      case 'promedios_infinita':
        if (!z || !EValue || !DValue) {
          toast.error('Por favor, complete todos los campos.');
          return;
        }
        const nPromedio = Math.pow(z, 2) * Math.pow(DValue, 2) / Math.pow(EValue, 2);
        result = { n: nPromedio.toFixed(2) };
        break;

      case 'promedios_finite':
        if (!z || !EValue || !NValue || !DValue) {
          toast.error('Por favor, complete todos los campos.');
          return;
        }
        const nPromedioFinite = (NValue * Math.pow(z, 2) * Math.pow(DValue, 2)) / ((NValue-1) *  Math.pow(EValue, 2) + ((Math.pow(z, 2) * Math.pow(DValue,2))));
        result = { n: nPromedioFinite.toFixed(2) };
        break;

      default:
        toast.error('Método no válido.');
    }

    setResults(result);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <h1 className="text-2xl font-bold mb-4">Cálculo de Tamaño de Muestra</h1>

      <div className='flex w-full'>
        <div className='w-1/2 border-r-2 border-white border-solid'>
          <div className="mb-4">
            <label className="block mb-2">Seleccionar Método:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="p-2 bg-gray-900 border border-gray-600 rounded"
            >
              <option value="proporciones_infinita">Proporciones Poblacion Infinita</option>
              <option value="proporciones_finite">Proporciones Poblacion Finita</option>
              <option value="promedios_infinita">Promedios Poblacion Infinita</option>
              <option value="promedios_finite">Promedios Poblacion Finita</option>
            </select>
          </div>
          <div className='grid grid-cols-2 w-full'>
            <div className="mb-4">
              <label className="block mb-2">Valor Z:</label>
              <input
                type="number"
                name="Z"
                value={data.Z}
                onChange={handleChange}
                className="p-2 bg-gray-900 border border-gray-600 rounded"
                step="any"
              />
            </div>

            {(method === 'proporciones_infinita' || method === 'proporciones_finite') && (
              <div className="mb-4">
                <label className="block mb-2">Valor p:</label>
                <input
                  type="number"
                  name="p"
                  value={data.p}
                  onChange={handleChange}
                  className="p-2 bg-gray-900 border border-gray-600 rounded"
                  step="any"
                />
              </div>
            )}

            {(method === 'proporciones_infinita' || method === 'proporciones_finite') && (
              <div className="mb-4">
                <label className="block mb-2">Valor q:</label>
                <input
                  type="number"
                  name="q"
                  value={data.q}
                  onChange={handleChange}
                  className="p-2 bg-gray-900 border border-gray-600 rounded"
                  step="any"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-2">Valor E:</label>
              <input
                type="number"
                name="E"
                value={data.E}
                onChange={handleChange}
                className="p-2 bg-gray-900 border border-gray-600 rounded"
                step="any"
              />
            </div>

            {(method === 'proporciones_finite' || method === 'promedios_finite') && (
              <div className="mb-4">
                <label className="block mb-2">Valor N:</label>
                <input
                  type="number"
                  name="N"
                  value={data.N}
                  onChange={handleChange}
                  className="p-2 bg-gray-900 border border-gray-600 rounded"
                  step="any"
                />
              </div>
            )}

            {(method === 'promedios_infinita' || method === 'promedios_finite') && (
              <div className="mb-4">
                <label className="block mb-2">Desviación Estándar (&sigma;):</label>
                <input
                  type="number"
                  name="D"
                  value={data.D}
                  onChange={handleChange}
                  className="p-2 bg-gray-900 border border-gray-600 rounded"
                  step="any"
                />
              </div>
            )}
          </div>
          <div className='w-full flex items-center justify-center'>
            <button 
              onClick={calculateMethod} 
              className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
            >
              Calcular
            </button>
          </div>
        </div>
        <div className='w-1/2 mx-auto px-10'>
          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">Resultados</span>
              <div>
                <span className="text-2xl">Tamaño de muestra calculado:</span>
                <p>{`n = ${results.n}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculationPage;
