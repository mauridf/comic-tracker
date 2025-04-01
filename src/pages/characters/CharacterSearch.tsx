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
import { searchCharacters } from '../../services/characterService';
import { ComicVineCharacter } from '../../types/character';

interface CharacterSearchProps {
  onSelect: (character: ComicVineCharacter) => void;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ComicVineCharacter[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await searchCharacters(searchTerm);
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

    const formatGender = (gender?: number | string): string => {
        if (gender === 1) return 'M';
        if (gender === 2) return 'F';
        return 'O'; // Outro/Outros
    };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Personagem"
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
                <TableCell>Nome Real</TableCell>
                <TableCell>Apelido</TableCell>
                <TableCell>Origem</TableCell>
                <TableCell>Primeira Aparição</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((character) => (
                <TableRow key={character.id}>
                  <TableCell>{character.name}</TableCell>
                  <TableCell>{character.real_name}</TableCell>
                  <TableCell>{character.aliases}</TableCell>
                  <TableCell>{character.origin?.name}</TableCell>
                  <TableCell>{formatFirstAppearance(character.first_appeared_in_issue)}</TableCell>
                  <TableCell>{formatGender(character.gender)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onSelect(character)}
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
        <p>Nenhum Personagem encontrado com esse nome</p>
      )}
    </Box>
  );
};