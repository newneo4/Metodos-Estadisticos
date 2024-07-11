'use client'

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import { valoresPa, valoresR } from '../../../utils/tablaCameron';
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

const CameronPage = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const calculateCameronMethod = () => {
    if (data.length === 0) {
      alert('Por favor carga un archivo Excel primero.');
      return;
    }

    const nca = data[0]['NCA'];
    const alpha = data[0]['ALPHA'];
    const ncl = data[0]['NCL'];
    const beta = data[0]['BETA'];

    const p1 = nca / 100;
    const p2 = ncl / 100;
    const rc = p2 / p1;

    let r_aux = 0;
    let np_aux = 0;
    let n_index = 0;
    let n_sample = 0;
    let valores_x = [];
    let valores_y = [];

    const sig = `${alpha}_${beta}`;

    for (const key in valoresR) {
      if (valoresR[key][sig] <= rc) {
        n_index = rc - valoresR[key][sig] > valoresR[key - 1][sig] - rc ? parseInt(key) - 1 : parseInt(key);

        r_aux = valoresR[n_index][sig];
        np_aux = valoresR[n_index]['np1'];

        break;
      }
    }

    n_sample = np_aux / p1;

    const fila_N = valoresPa[n_index];

    for (const key in fila_N) {
      const valor = fila_N[key] / n_sample;
      valores_y.push(parseFloat(key));
      valores_x.push(valor.toString());
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

    setResults({ nca, ncl, p2, p1, rc, r_aux, np_aux, n_index, n_sample, dataset, alpha, beta });
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <h1 className="text-2xl font-titulo mb-4">Método de Cameron</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

      {data.length > 0 && (
        <div className="flex overflow-x-auto text-white">
          <table className="min-w-full bg-gray-800 border border-gray-200 rounded-lg shadow-sm text-center">
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
            onClick={calculateCameronMethod}
            className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
          >
            Calcular Método de Cameron
          </button>

          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">RESOLUCION PASO A PASO</span>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 1 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calculamos p1 y p2</span>
                  <p>{`p1 = ${results.p1}`}</p>
                  <p>{`p2 = ${results.p2}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 2 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calculamos el Rc</span>
                  <p>{`Rc = ${results.rc}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 3 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Hallamos el valor optimo de la tabla</span>
                  <p>{`Ya que tenemos alpha = ${results.alpha} y beta = ${results.beta}, ademas del valor de Rc = ${results.rc}. Entonces hallamos el valor optimo de R = ${results.r_aux}, c = ${results.n_index} y np1 = ${results.np_aux}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 4 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Hallamos el tamaño de la muestra</span>
                  <p>{`n = ${results.n_sample}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 5 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Graficamos los valores</span>
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

export default CameronPage;
