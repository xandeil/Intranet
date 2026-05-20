import { useState, useEffect } from 'react';

export const useSheetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        
        // Aqui transformaríamos o texto do CSV em um Objeto JS
        // Esse é o "pulo do gato" para o Front entender a planilha
        const result = parseCSV(text); 
        
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};