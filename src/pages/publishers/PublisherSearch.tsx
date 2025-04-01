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
import { searchPublishers } from '../../services/publisherService';
import { ComicVinePublisher } from '../../types/publisher';

interface PublisherSearchProps {
  onSelect: (publisher: ComicVinePublisher) => void;
}

export const PublisherSearch: React.FC<PublisherSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ComicVinePublisher[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await searchPublishers(searchTerm);
      setResults(data);
    } catch (error) {
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Editora"
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
                <TableCell>Localização</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((publisher) => (
                <TableRow key={publisher.id}>
                  <TableCell>{publisher.name}</TableCell>
                  <TableCell>
                    {publisher.location_address}, {publisher.location_city}, {publisher.location_state}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onSelect(publisher)}
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
        <p>Nenhuma Editora encontrada com esse nome</p>
      )}
    </Box>
  );
};