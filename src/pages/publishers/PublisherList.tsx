import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { PaginatedTable } from '../../components/common/PaginatedTable';
import { getAllPublishers, deletePublisher } from '../../services/publisherService';
import { Publisher } from '../../types/publisher';

const columns = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'locationCity', label: 'Cidade', minWidth: 100 },
  { id: 'locationState', label: 'Estado', minWidth: 100 },
];

export const PublisherList: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        setLoading(true);
        const data = await getAllPublishers();
        setPublishers(Array.isArray(data) ? data : []); // Garante que seja um array
      } catch (err) {
        setError('Erro ao carregar editoras');
        console.error('Erro ao carregar editoras:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPublishers();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/publishers/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta editora?')) {
      try {
        await deletePublisher(id);
        setPublishers(publishers.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir editora:', error);
      }
    }
  };

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/publishers/new')}
        style={{ marginBottom: 16 }}
      >
        NOVO
      </Button>
      <PaginatedTable
        columns={columns}
        data={filteredPublishers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        count={filteredPublishers.length}
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