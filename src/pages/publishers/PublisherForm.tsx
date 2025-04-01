import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    TextField,
    Box,
    Typography,
    Paper,
    Grid,
  } from '@mui/material';
import { PublisherSearch } from './PublisherSearch';
import {
  getPublisher,
  createPublisher,
  updatePublisher,
} from '../../services/publisherService';
import { Publisher, ComicVinePublisher } from '../../types/publisher';

export const PublisherForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(!id);
  const [formData, setFormData] = useState<Omit<Publisher, 'id'>>({
    comicVineId: 0,
    name: '',
    aliases: '',
    deck: '',
    imageUrl: '',
    locationAddress: '',
    locationCity: '',
    locationState: '',
    siteDetailUrl: '',
  });

  useEffect(() => {
    if (id) {
      const loadPublisher = async () => {
        try {
          const publisher = await getPublisher(parseInt(id));
          setFormData({
            comicVineId: publisher.comicVineId,
            name: publisher.name,
            aliases: publisher.aliases || '',
            deck: publisher.deck || '',
            imageUrl: publisher.imageUrl || '',
            locationAddress: publisher.locationAddress || '',
            locationCity: publisher.locationCity || '',
            locationState: publisher.locationState || '',
            siteDetailUrl: publisher.siteDetailUrl || '',
          });
        } catch (error) {
          console.error('Erro ao carregar editora:', error);
        }
      };
      loadPublisher();
    }
  }, [id]);

  const handleSelectPublisher = (publisher: ComicVinePublisher) => {
    setFormData({
      comicVineId: publisher.id,
      name: publisher.name,
      aliases: publisher.aliases || '',
      deck: publisher.deck || '',
      imageUrl: publisher.image?.original_url || '',
      locationAddress: publisher.location_address || '',
      locationCity: publisher.location_city || '',
      locationState: publisher.location_state || '',
      siteDetailUrl: publisher.site_detail_url || '',
    });
    setShowSearch(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePublisher(parseInt(id), formData);
      } else {
        await createPublisher(formData);
      }
      navigate('/publishers');
    } catch (error) {
      console.error('Erro ao salvar editora:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Editar Editora' : 'Nova Editora'}
      </Typography>

      {showSearch ? (
        <PublisherSearch onSelect={handleSelectPublisher} />
      ) : (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid component="div" item xs={12}>
                <Button
                    variant="outlined"
                    onClick={() => setShowSearch(true)}
                >
                    Buscar na Comic Vine
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Apelidos"
                name="aliases"
                value={formData.aliases}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Descrição"
                name="deck"
                value={formData.deck}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Endereço"
                name="locationAddress"
                value={formData.locationAddress}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField
                label="Cidade"
                name="locationCity"
                value={formData.locationCity}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField
                label="Estado"
                name="locationState"
                value={formData.locationState}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="URL da Imagem"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="URL de Detalhes"
                name="siteDetailUrl"
                value={formData.siteDetailUrl}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={() => navigate('/publishers')}>
                Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                Salvar
                </Button>
            </Box>
            </Grid>
        </Grid>
    </form>
      )}
    </Paper>
  );
};