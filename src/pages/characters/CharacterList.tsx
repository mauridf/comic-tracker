import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { PaginatedTable } from '../../components/common/PaginatedTable';
import { getAllCharachters, deleteCharacter } from '../../services/characterService';
import { Character } from '../../types/character';

const columns = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'realName', label: 'Nome Real', minWidth: 100 },
  { id: 'aliases', label: 'Apelido', minWidth: 100 },
];

export const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const data = await getAllCharachters();
        setCharacters(Array.isArray(data) ? data : []); // Garante que seja um array
      } catch (err) {
        setError('Erro ao carregar personagens');
        console.error('Erro ao carregar personagens:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/characters/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      try {
        await deleteCharacter(id);
        setCharacters(characters.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir personagem:', error);
      }
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/characters/new')}
        style={{ marginBottom: 16 }}
      >
        NOVO
      </Button>
      <PaginatedTable
        columns={columns}
        data={filteredCharacters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        count={filteredCharacters.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </Box>
  );
};