import axios from 'axios';
import { Character, ComicVineCharacter } from '../types/character';

const API_URL = 'https://localhost:44300/api/Characters';

export const searchCharacters = async (name: string): Promise<ComicVineCharacter[]> => {
    try {
        const response = await axios.get<{
            success: boolean;
            data: ComicVineCharacter[];
            errors: any[];
        }>(`${API_URL}/search?name=${name}`);
        
        if (!response.data.success) {
            console.error('Erro na API:', response.data.errors);
            return [];
        }
        
        return response.data.data || [];
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        return [];
    }
};

export const getCharacter = async (id: number): Promise<Character> => {
    const response = await axios.get<Character>(`${API_URL}/${id}`);
    return response.data;
};

export const createCharacter = async (character: Omit<Character, 'id'>): Promise<Character> => {
    const response = await axios.post<Character>(API_URL, character);
    return response.data;
};

export const updateCharacter = async (id: number, character: Partial<Character>): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, character);
};

export const deleteCharacter = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getAllCharachters = async (): Promise<Character[]> => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: Character[];
        errors: any[];
      }>(API_URL);
      return response.data.data || []; // Acessa a propriedade data dentro do response.data
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  };