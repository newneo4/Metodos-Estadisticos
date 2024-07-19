'use client'

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Para cargar archivos Excel
import { Line } from 'react-chartjs-2'; // Importa el componente Line de react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { mean, inv, multiply, transpose } from 'mathjs';
import { jStat } from 'jstat';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Función para calcular la matriz de covarianza
const calculateCovarianceMatrix = (data) => {
  const meanVector = mean(data, 0);
  const centeredData = data.map(row => row.map((value, index) => value - meanVector[index]));
  const covarianceMatrix = multiply(transpose(centeredData), centeredData).map(row => row.map(value => value / (data.length - 1)));
  return covarianceMatrix;
};

const HotellingPage = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState(null); // Estado para almacenar los resultados del método
  const [chartData, setChartData] = useState(null); // Estado para almacenar los datos del gráfico

  // Función para manejar la carga de archivos Excel
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);
    };
  };

  // Función para calcular el método de Hotelling
  const calculateHotellingMethod = () => {
    if (data.length === 0) {
      alert("Por favor carga un archivo Excel primero.");
      return;
    }

    // Convertir los datos de la hoja Excel a una matriz numérica
    const numericData = data.slice(1).map(row => row.map(cell => parseFloat(cell)));
    const meanVector = mean(numericData, 0);
    const covMatrix = calculateCovarianceMatrix(numericData);
    const invCovMatrix = inv(covMatrix);
    const n = numericData.length;

    // Calcular los valores de T^2
    const T_squared = numericData.map(row => {
      const diff = row.map((value, index) => value - meanVector[index]);
      return multiply(multiply(diff, invCovMatrix), transpose(diff));
    });

    // Limite de control usando distribución F con jStat
    const alpha = 0.05;
    const p = numericData[0].length;
    const fValue = jStat.centralF.inv(1 - alpha, p, n - p); // Valor crítico de F
    const controlLimit = (p * (n - 1) * fValue) / (n - p);

    setResults({ controlLimit, T_squared });

    // Datos para Chart.js
    const labels = Array.from({ length: n }, (_, i) => i + 1);
    const chartData = {
      labels,
      datasets: [
        {
          label: 'T^2 de Hotelling',
          data: T_squared,
          borderColor: 'blue',
          fill: false,
          pointRadius: 5,
        },
        {
          label: 'Límite de control',
          data: Array(n).fill(controlLimit),
          borderColor: 'red',
          borderDash: [5, 5],
          fill: false,
        },
      ],
    };

    setChartData(chartData);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <h1 className="text-2xl font-bold mb-4">Método de Hotelling</h1>
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
                {data[0].map((key, index) => (
                  <th key={index} className="px-4 py-2 border-solid border border-white">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-white hover:text-black hover:font-bold`}
                >
                  {row.map((value, idx) => (
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
            onClick={calculateHotellingMethod}
            className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
          >
            Calcular Método de Hotelling
          </button>

          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">RESOLUCIÓN PASO A PASO</span>

              <div>
                <span className="text-2xl flex flex-col underline">PASO 1:</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calcular el valor de T^2 para cada punto</span>
                  <p>{`Valor T^2 de Hotelling: ${results.T_squared.map(value => value.toFixed(2)).join(', ')}`}</p>
                </div>
              </div>

              <div>
                <span className="text-2xl flex flex-col underline">PASO 2:</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calcular el límite de control</span>
                  <p>{`El límite de control se calcula utilizando el valor crítico de la distribución F`}</p>
                  <p>{`Límite de control: ${results.controlLimit.toFixed(2)}`}</p>
                </div>
              </div>

              <div>
                <span className="text-2xl flex flex-col underline">PASO 3:</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Visualizar los resultados en el gráfico</span>
                  <p>En el gráfico, la línea azul representa los valores T^2 calculados y la línea roja representa el límite de control.</p>
                  <div className="flex flex-col px-4">
                  {chartData && (
                    <Line
                      width={300}
                      height={100} 
                      data={chartData}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotellingPage;
