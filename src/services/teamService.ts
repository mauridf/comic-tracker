import axios from 'axios';
import { Team, ComicVineTeam } from '../types/team';

const API_URL = 'https://localhost:44300/api/Teams';

export const searchTeams = async (name: string): Promise<ComicVineTeam[]> => {
    try {
        const response = await axios.get<{
            success: boolean;
            data: ComicVineTeam[];
            errors: any[];
        }>(`${API_URL}/search?name=${name}`);
        
        if (!response.data.success) {
            console.error('Erro na API:', response.data.errors);
            return [];
        }
        
        return response.data.data || [];
    } catch (error) {
        console.error('Erro ao buscar equipes:', error);
        return [];
    }
};

export const getTeamByComicVineId = async (comicVineId: number): Promise<Team> => {
    const response = await axios.get<Team>(`${API_URL}/comicvine/${comicVineId}`);
    return response.data;
};

export const getTeam = async (id: number): Promise<Team> => {
    const response = await axios.get<Team>(`${API_URL}/${id}`);
    return response.data;
};

export const createTeam = async (team: Omit<Team, 'id'>): Promise<Team> => {
    const response = await axios.post<Team>(API_URL, team);
    return response.data;
};

export const updateTeam = async (id: number, team: Partial<Team>): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, team);
};

export const deleteTeam = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getAllTeams = async (): Promise<Team[]> => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: Team[];
        errors: any[];
      }>(API_URL);
      return response.data.data || []; // Acessa a propriedade data dentro do response.data
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  };