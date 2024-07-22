'use client'

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; 
import { inspectionLevels,qualityLevels } from '../../../utils/tablaStdMil';
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
import { Line } from 'react-chartjs-2';
import toast, { Toaster } from 'react-hot-toast';


const MilPage = () => {
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
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  // Función para calcular el Método de Mil
  const calculateMilMethod = () => {
    if (data.length === 0) {
      alert('Por favor carga un archivo Excel primero.');
      return;
    }

    const level = (data[0]['NIVEL'] == '' || data[0]['NIVEL'] === undefined) ? 'IV' : data[0]['NIVEL'];
    const lotSize = data[0]['n'];
    const media = data[0]['MEDIA'];
    const es = data[0]['ES'];
    const s = data[0]['S'];
    const ei = data[0]['EI'];
    const aql = data[0]['AQL'];

    const inspectionLevel = inspectionLevels.find(level => {
      const [min, max] = level.lotSize.split(' a ').map(Number);
      return lotSize >= min && lotSize <= max;
    });

    if (!inspectionLevel) {
      toast.error("Tamaño de lote no encontrado en los niveles de inspección");
    }

    const letraNivel = inspectionLevel[level] 

    const qualityLevel = qualityLevels.find(q => q.code === letraNivel);

    if (!qualityLevel) {
      throw new Error("Nivel de calidad no encontrado para el código dado");
    }

    const aqlIndex = qualityLevel.AQL.indexOf(aql);

    if (aqlIndex === -1) {
      throw new Error("AQL no encontrado en el nivel de calidad dado");
    }

    const mValue = qualityLevel.M[aqlIndex];
    const mValueSevero = qualityLevel.M[aqlIndex-1]
    const mSize = qualityLevel.sampleSize;

    const zes = (es - media)/s;
    const zei = (media - ei)/s;

    setResults({level,lotSize,media,es,s,ei,aql,letraNivel,mValue,mValueSevero,mSize,zes,zei})
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-800 px-10 pt-40 opacity-80 pb-20 text-white">
      <h1 className="text-2xl font-bold mb-4">Método de Mil</h1>
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
            onClick={calculateMilMethod} 
            className="bg-gray-900 hover:bg-white text-white font-bold py-2 px-4 rounded my-4 border-4 border-double hover:text-black"
          >
            Calcular Método de Mil
          </button>

          {results && (
            <div className="mt-4 text-white font-titulo gap-4 flex flex-col">
              <span className="text-3xl">RESOLUCION PASO A PASO</span>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 1 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Hallamos el nivel de inspeccion</span>
                  <p>{`Tamaño de lote : ${results.lotSize}`}</p>
                  <p>{`Nivel de inspeccion : ${results.level}`}</p>
                  <p>{`Letra codigo :  ${results.letraNivel}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 2 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Coeficiente de inspeccion normal - severa</span>
                  <p>{`Letra codigo : ${results.letraNivel}`}</p>
                  <p>{`AQL : ${results.aql}`}</p>
                  <p>{`Inspeccion normal : ${results.mValue}`}</p>
                  <p>{`Inspeccion severa : ${results.mValueSevero}`}</p>
                  <p>{`Tamaño de muestra : ${results.mSize}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 3 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calculo de las Zes y Zei</span>
                  <p>{`Zes = ${results.es} - ${results.media} / ${results.s} = ${results.zes}`}</p>
                  <p>{`Zes = ${results.media} - ${results.ei} / ${results.s} = ${results.zei}`}</p>
                </div>
              </div>
              <div>
                <span className="text-2xl flex flex-col underline">PASO 4 :</span>
                <div className="flex flex-col px-10">
                  <span className="text-xl">Calculo de las Zes y Zei</span>
                  <p>{`Zes = ${results.es} - ${results.media} / ${results.s} = ${results.zes}`}</p>
                  <p>{`Zes = ${results.media} - ${results.ei} / ${results.s} = ${results.zei}`}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MilPage;
