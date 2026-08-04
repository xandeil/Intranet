import { useState, useEffect } from 'react';

// Faz o parse de uma linha de CSV respeitando campos entre aspas (que podem conter vírgulas)
const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // pula a segunda aspa (aspas escapadas -> "")
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
};

// Converte um texto CSV (ex: exportado de uma planilha Google Sheets publicada) em array de objetos,
// usando a primeira linha como cabeçalho/chaves.
export const parseCSV = (text) => {
  const lines = text.replace(/\r/g, '').split('\n').filter((line) => line.length > 0);
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
};

export const useSheetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Falha ao buscar planilha (HTTP ${response.status})`);
        }
        const text = await response.text();
        setData(parseCSV(text));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao buscar dados da planilha:', err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
