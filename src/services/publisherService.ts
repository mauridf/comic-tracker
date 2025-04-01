import axios from 'axios';
import { Publisher, ComicVinePublisher } from '../types/publisher';

const API_URL = 'https://localhost:44300/api/Publishers';

export const searchPublishers = async (name: string): Promise<ComicVinePublisher[]> => {
    try {
        const response = await axios.get<{
            success: boolean;
            data: ComicVinePublisher[];
            errors: any[];
        }>(`${API_URL}/search?name=${name}`);
        
        if (!response.data.success) {
            console.error('Erro na API:', response.data.errors);
            return [];
        }
        
        return response.data.data || [];
    } catch (error) {
        console.error('Erro ao buscar editoras:', error);
        return [];
    }
};

export const getPublisher = async (id: number): Promise<Publisher> => {
    const response = await axios.get<Publisher>(`${API_URL}/${id}`);
    return response.data;
};

export const createPublisher = async (publisher: Omit<Publisher, 'id'>): Promise<Publisher> => {
    const response = await axios.post<Publisher>(API_URL, publisher);
    return response.data;
};

export const updatePublisher = async (id: number, publisher: Partial<Publisher>): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, publisher);
};

export const deletePublisher = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getAllPublishers = async (): Promise<Publisher[]> => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: Publisher[];
        errors: any[];
      }>(API_URL);
      return response.data.data || []; // Acessa a propriedade data dentro do response.data
    } catch (error) {
      console.error('Error fetching publishers:', error);
      return [];
    }
  };