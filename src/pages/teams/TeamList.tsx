import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { PaginatedTable } from '../../components/common/PaginatedTable';
import { getAllTeams, deleteTeam } from '../../services/teamService';
import { Team } from '../../types/team';

const columns = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'aliases', label: 'Apelido', minWidth: 100 },
  { id: 'publisherName', label: 'Editora', minWidth: 100 },
];

export const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await getAllTeams();
        setTeams(Array.isArray(data) ? data : []); // Garante que seja um array
      } catch (err) {
        setError('Erro ao carregar equipes');
        console.error('Erro ao carregar equipes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/teams/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta equipe?')) {
      try {
        await deleteTeam(id);
        setTeams(teams.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir equipe:', error);
      }
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/teams/new')}
        style={{ marginBottom: 16 }}
      >
        NOVO
      </Button>
      <PaginatedTable
        columns={columns}
        data={filteredTeams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        count={filteredTeams.length}
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