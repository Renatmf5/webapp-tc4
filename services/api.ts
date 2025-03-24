/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.grupo-ever-rmf.com/api/v1/';

console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDataMetrics = async () => {
  try {
    const response = await api.get('manageMetrics/getMetrics');
    //console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};

export const postData = async (data: never) => {
  try {
    const response = await api.post('/endpoint', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchTradingData = async () => {
  try {
    const response = await api.get('manageTrading/GetTrade');

    // Verificar se o response.data é uma lista com um JSON serializado na posição 0
    const rawData = response.data[0]; // Pega a string JSON na posição 0
    const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData; // Desserializa a string JSON

    // Transformar os dados no formato esperado
    const data = parsedData.map((item: any) => ({
      side: item?.side ?? 'N/A',
      entry_price: item?.entry_price ?? 'N/A',
      exit_price: item?.exit_price ?? 'N/A',
      status: item?.status ?? 'N/A',
      profit_loss: item?.profit_loss !== undefined && !isNaN(item.profit_loss)
        ? parseFloat(item.profit_loss).toFixed(2)
        : 'N/A',
      success: item?.success !== undefined ? (item.success ? 'Yes' : 'No') : 'N/A',
      trade_return: item?.trade_return ?? 'N/A',
      unrealizedPnl: item?.unrealizedPnl !== undefined && !isNaN(item.unrealizedPnl)
        ? parseFloat(item.unrealizedPnl).toFixed(2)
        : 'N/A',
      current_value: item?.current_value !== undefined && !isNaN(item.current_value)
        ? parseFloat(item.current_value).toFixed(2)
        : 'N/A',
      created_at: item?.created_at ? new Date(item.created_at).toLocaleString() : 'N/A',
      updated_at: item?.updated_at ? new Date(item.updated_at).toLocaleString() : 'N/A',
    }));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};