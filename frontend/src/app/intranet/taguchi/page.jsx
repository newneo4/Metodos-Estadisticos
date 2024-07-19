'use client'

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; 
import { Line } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TaguchiPage = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null); 

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const renderTable = () => {
    if (!results || !results.dataset) return null;

    return (
      <div className="mt-4 text-white">
        <h2 className="text-2xl font-bold mb-2">Valores de X e Y del Dataset</h2>
        <table className="min-w-full bg-gray-800 border border-gray-200 rounded-lg shadow-sm text-center">
          <thead>
            <tr className="bg-black border-solid border border-white">
              <th className="px-4 py-2 border-solid border border-white">Valor X</th>
              <th className="px-4 py-2 border-solid border border-white">Valor Y</th>
            </tr>
          </thead>
          <tbody>
            {results.dataset.labels.map((label, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-white hover:text-black hover:font-bold`}>
                <td className="border-solid border border-white px-4 py-2">{label}</td>
                <td className="border-solid border border-white px-4 py-2">{results.dataset.datasets[0].data[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const calculateTaguchiMethod = () => {
    if (data.length === 0) {
      alert("Por favor carga un archivo Excel primero.");
      return;
    }

    const c = data[0]['C'];
    const N = data[0]['N'];
    const LES = data[0]['LES'];
    const error = (LES - N).toFixed(2);

    const CoeFunc = c / (error * error);

    console.log(error)
    const N_les = parseFloat(N) + parseFloat(error);
    const N_inf = parseFloat(N) - parseFloat(error);
    const valores_x = [];
    const valores_y = [];

    for (let index = N_inf; index.toFixed(2) <= N_les ; index+=0.05) {
      const valor = CoeFunc * (index - N) * (index- N);
      valores_y.push(valor.toFixed(2));
      valores_x.push(index.toFixed(2).toString());
    }

    const dataset = {
      labels: valores_x,
      datasets: [
        {
          label: 'Valores Y',
          data: valores_y,
          fill: true,
          borderColor: 'rgb(255,255,255)',
          tension: 0.1,
        },
      ],
    };

    setResults({c, N, LES, error, CoeFunc, dataset})
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <h1 className="text-2xl font-bold mb-4">Método de Taguchi</h1>
      <input 
        type="file" 
        accept='.xlsx, .xls'
        onChange={handleFileUpload}  
        className="mb-4"
      />

{data.length > 0 && (
        <div className="flex overflow-x-auto text-white">
          <table className="min-w-full bg-gray-800 border mb-4 border-gray-200 rounded-lg shadow-sm text-center">
            <thead>
              <tr className="bg-black border-solid border border-white">
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className=" px-4 py-2 border-solid border border-white">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-white hover:text-black hover:font-bold`}
                >
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border-solid border border-white px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {data.length > 0 && (
        <div>
          <button 
            onClick={calculateTaguchiMethod} 
            className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
          >
            Calcular Método de Taguchi
          </button>

          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">RESOLUCION PASO A PASO</span>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 1 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Hallamos la funcion de perdida</span>
                  <p>{`Costo de la desviacion : ${results.c}`}</p>
                  <p>{`Limite de especificacion superior : ${results.LES}`}</p>
                  <p>{`Valor nominal de la caracteristica :  ${results.N}`}</p>
                  <p>{`Definimos la funcion de perdida :  ${results.c}/(${results.LES} - ${results.N})^2 * (x-${results.N})^2 = ${results.CoeFunc.toFixed(2)} * (x-${results.N})^2`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 2 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Tabulamos valores</span>
                  {results.dataset && (
                    <Line
                      width={300}
                      height={100} 
                      data={results.dataset}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Gráfico de Valores',
                          },
                        },
                        scales: {
                          x: {
                            type: 'linear', // Tipo de escala para el eje X
                            title: {
                              display: true,
                              text: 'Valores X',
                            },
                            grid: {
                              color: 'white', // Color de las líneas de la cuadrícula en el eje X
                            },
                            ticks: {
                              color: 'white', // Color de los ticks en el eje X
                            },
                          },
                          y: {
                            type: 'linear', // Tipo de escala para el eje Y
                            title: {
                              display: true,
                              text: 'Valores Y',
                            },
                            grid: {
                              color: 'white', // Color de las líneas de la cuadrícula en el eje Y
                            },
                            ticks: {
                              color: 'white', // Color de los ticks en el eje Y
                            },
                          },
                        },
                        elements: {
                          point: {
                            backgroundColor: 'white', 
                            borderColor: 'rgb(75, 192, 192)', 
                            borderWidth: 1, 
                            radius: 3, 
                          },
                          line: {
                            borderColor: 'white', 
                            borderWidth: 2, 
                            tension: 0.1,
                            fill: true, 
                          },
                        },
                      }}
                    />
                  )}
                  
                  {renderTable()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaguchiPage;
