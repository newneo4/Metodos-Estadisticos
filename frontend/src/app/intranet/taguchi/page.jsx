'use client'

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Para cargar archivos Excel
import { Line } from 'react-chartjs-2'; // Importa el componente Line de react-chartjs-2

const TaguchiPage = () => {
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

  // Función para calcular el Método de Taguchi
  const calculateTaguchiMethod = () => {
    if (data.length === 0) {
      alert("Por favor carga un archivo Excel primero.");
      return;
    }

    // Ejemplo de cálculos ficticios para el Método de Taguchi
    const temperatures = data.map(entry => entry['Temperatura (°C)']);
    const pressures = data.map(entry => entry['Presión (u)']);

    const results = {
      parametroA: 0.5,
      parametroB: 0.75,
      // Agregar más resultados según sea necesario
    };

    const chartData = {
      labels: temperatures.map((temp, index) => `Punto ${index + 1}`), // Ejemplo de etiquetas como categorías
      datasets: [
        {
          label: 'Presión vs. Temperatura',
          data: pressures,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    setResults(results);
    setChartData(chartData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Método de Taguchi</h1>
      <input 
        type="file" 
        accept='.xlsx, .xls'
        onChange={handleFileUpload}  
        className="mb-4"
      />

      {data.length > 0 && (
        <div>
          <button 
            onClick={calculateTaguchiMethod} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Calcular Método de Taguchi
          </button>

          {results && (
            <div className="mt-4">
              {/* Resultados */}
              <h2 className="text-xl font-bold mb-2">Resultados del Método de Taguchi:</h2>
              <ul className="list-disc pl-8">
                <li>Parámetro A: {results.parametroA}</li>
                <li>Parámetro B: {results.parametroB}</li>
                {/* Agregar más resultados según sea necesario */}
              </ul>

              {/* Gráfico */}
              <h2 className="text-xl font-bold mt-4 mb-2">Gráfico de Presión vs. Temperatura:</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaguchiPage;
