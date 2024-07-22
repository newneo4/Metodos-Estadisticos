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
import toast, { Toaster } from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SeisPage = () => {
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

  const calculateSeisSigmaMethod = () => {
    if (data.length === 0) {
      toast.error("Por favor carga un archivo Excel primero.");
      return;
    }
  
    // Validar que las columnas 'defect' y 'value' existan
    const requiredColumns = ['defect', 'value'];
    const columns = Object.keys(data[0]);
    const missingColumns = requiredColumns.filter(col => !columns.includes(col));
    if (missingColumns.length > 0) {
      toast.error(`El archivo Excel debe contener las siguientes columnas: ${missingColumns.join(', ')}`);
      return;
    }
  
    // Validar que los valores en la columna 'defect' sean 0 o 1
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row.defect !== 0 && row.defect !== 1) {
        toast.error(`La columna 'defect' debe contener solo 0 o 1. Error en la fila ${i + 1}.`);
        return;
      }
      if (typeof row.value !== 'number') {
        toast.error(`La columna 'value' debe contener solo valores numéricos. Error en la fila ${i + 1}.`);
        return;
      }
    }
  
    // Implementación del método Seis Sigma
    const defects = data.reduce((sum, row) => sum + (row.defect ? 1 : 0), 0);
    const totalOpportunities = data.length;
    const defectRate = defects / totalOpportunities;
    const dpmo = defectRate * 1000000;
    const sigma = 1.5 - Math.log10(dpmo / 1000000);
  
    // Generar datos para el gráfico
    const labels = data.map((row, index) => index);
    const values = data.map(row => row.value);
  
    const dataset = {
      labels,
      datasets: [
        {
          label: 'Valores',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        }
      ]
    };
  
    setResults({ defects, totalOpportunities, defectRate, dpmo, sigma, dataset });
  };
  

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Método de Seis Sigma</h1>
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
            onClick={calculateSeisSigmaMethod} 
            className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
          >
            Calcular Método de Seis Sigma
          </button>

          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">RESOLUCION PASO A PASO</span>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 1 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Cálculo de Métricas</span>
                  <p>{`Defectos: ${results.defects}`}</p>
                  <p>{`Oportunidades Totales: ${results.totalOpportunities}`}</p>
                  <p>{`Tasa de Defectos: ${results.defectRate.toFixed(4)}`}</p>
                  <p>{`DPMO: ${results.dpmo.toFixed(2)}`}</p>
                  <p>{`Valor Sigma: ${results.sigma.toFixed(2)}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 2 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Visualización de Datos</span>
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
                            type: 'linear',
                            title: {
                              display: true,
                              text: 'Valores X',
                            },
                            grid: {
                              color: 'white',
                            },
                            ticks: {
                              color: 'white',
                            },
                          },
                          y: {
                            type: 'linear',
                            title: {
                              display: true,
                              text: 'Valores Y',
                            },
                            grid: {
                              color: 'white',
                            },
                            ticks: {
                              color: 'white',
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

export default SeisPage;
