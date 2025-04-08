import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
} from '@mui/material';
import { searchTeams } from '../../services/teamService';
import { ComicVineTeam } from '../../types/team';
interface TeamSearchProps {
  onSelect: (team: ComicVineTeam) => void;
}

export const TeamSearch: React.FC<TeamSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ComicVineTeam[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await searchTeams(searchTerm);
      setResults(data);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const formatFirstAppearance = (firstAppearance?: { 
        issue_number?: any;  // Alterado para 'any' para aceitar qualquer tipo
        name?: string 
    }): string => {
        if (!firstAppearance) return 'N/A';
        
        // Converte issue_number para string se não for undefined/null
        const issue = firstAppearance.issue_number !== undefined && 
                    firstAppearance.issue_number !== null 
                    ? String(firstAppearance.issue_number).trim() 
                    : 'N/A';
        
        const name = firstAppearance.name?.trim() || 'N/A';
        
        return `${issue} - ${name}`;
    };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Equipe"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          Buscar
        </Button>
      </Box>

      {results.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Apelido</TableCell>
                <TableCell>Total de Aparições</TableCell>
                <TableCell>Total de Membros da Equipe</TableCell>
                <TableCell>Primeira Aparição</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.aliases}</TableCell>
                  <TableCell>{team.count_of_isssue_appearances}</TableCell>
                  <TableCell>{team.count_of_team_members}</TableCell>
                  <TableCell>{formatFirstAppearance(team.first_appeared_in_issue)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onSelect(team)}
                    >
                      Incluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : isSearching ? (
        <p>Buscando...</p>
      ) : (
        <p>Nenhuma Equipe encontrada com esse nome</p>
      )}
    </Box>
  );
};