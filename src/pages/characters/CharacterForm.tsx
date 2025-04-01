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
import { CharacterSearch } from './CharacterSearch';
import {
  getCharacter,
  createCharacter,
  updateCharacter,
} from '../../services/characterService';
import { Character, ComicVineCharacter } from '../../types/character';

export const CharacterForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(!id);
  const [formData, setFormData] = useState<Omit<Character, 'id'>>({
    comicVineId: 0,
    aliases: '',
    birth: '',
    countOfIssueAppearances: 0,
    deck: '',
    description: '',
    firstAppearedInIssue: '',
    gender: '',
    imageUrl: '',
    name: '',
    origin: '',
    publisherName: '',
    realName:'',
    siteDetailUrl:'',
  });

  useEffect(() => {
    if (id) {
      const loadCharacter = async () => {
        try {
          const character = await getCharacter(parseInt(id));
          setFormData({
            comicVineId: character.comicVineId,
            aliases: character.aliases,
            birth: character.birth,
            countOfIssueAppearances: character.countOfIssueAppearances,
            deck: character.deck,
            description: character.description,
            firstAppearedInIssue: character.firstAppearedInIssue,
            gender: character.gender,
            imageUrl: character.imageUrl,
            name: character.name,
            origin: character.origin,
            publisherName: character.publisherName,
            realName:character.realName,
            siteDetailUrl: character.siteDetailUrl || '',
          });
        } catch (error) {
          console.error('Erro ao carregar personagem:', error);
        }
      };
      loadCharacter();
    }
  }, [id]);

  const handleSelectCharacter = (character: ComicVineCharacter) => {
    setFormData({
        comicVineId: character.id,
        aliases: character.aliases || 'N/A',
        birth: character.birth || 'N/A',
        countOfIssueAppearances: character.count_of_issue_appearances || 0,
        deck: character.deck || 'N/A',
        description: character.description || 'N/A',
        firstAppearedInIssue: character.first_appeared_in_issue 
            ? `${character.first_appeared_in_issue.issue_number || 'N/A'} - ${character.first_appeared_in_issue.name || 'N/A'}`
            : 'N/A',
        gender: character.gender || 'N/A',
        imageUrl: character.image?.original_url || 'N/A',
        name: character.name,
        origin: character.origin?.name || 'N/A',
        publisherName: character.publisher?.name || 'N/A',
        realName:character.real_name || 'N/A',
        siteDetailUrl: character.site_detail_url  || 'N/A'
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
        await updateCharacter(parseInt(id), formData);
      } else {
        await createCharacter(formData);
      }
      navigate('/characters');
    } catch (error) {
      console.error('Erro ao salvar personagem:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Editar Personagem' : 'Novo Personagem'}
      </Typography>

      {showSearch ? (
        <CharacterSearch onSelect={handleSelectCharacter} />
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
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Nascimento"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Total de Aparições"
                    name="countOfIssueAppearances"
                    value={formData.countOfIssueAppearances}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Deck"
                name="deck"
                value={formData.deck}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
            />
            <TextField
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Primeira Aparição"
                name="firstAppearedInIssue"
                value={formData.firstAppearedInIssue}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField
                label="Sexo"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField
                label="Origem"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Nome da Editora"
                name="publisherName"
                value={formData.publisherName}
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