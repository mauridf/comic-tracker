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
import { TeamSearch } from './TeamSearch';
import {
  getTeam,
  createTeam,
  updateTeam,
} from '../../services/teamService';
import { Team, ComicVineTeam } from '../../types/team';

export const TeamForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(!id);
  const [formData, setFormData] = useState<Omit<Team, 'id'>>({
    comicVineId: 0,
    aliases: '',
    countOfIssueAppearances: 0,
    countOfTeamMembers: 0,
    deck: '',
    description: '',
    firstAppearedInIssue: '',
    imageUrl: '',
    name: '',
    publisherName: '',
    siteDetailUrl:'',
  });

  useEffect(() => {
    if (id) {
      const loadTeam = async () => {
        try {
          const team = await getTeam(parseInt(id));
          setFormData({
            comicVineId: team.comicVineId,
            aliases: team.aliases,
            countOfIssueAppearances: team.countOfIssueAppearances,
            countOfTeamMembers: team.countOfTeamMembers,
            deck: team.deck,
            description: team.description,
            firstAppearedInIssue: team.firstAppearedInIssue,
            imageUrl: team.imageUrl,
            name: team.name,
            publisherName: team.publisherName,
            siteDetailUrl: team.siteDetailUrl || '',
          });
        } catch (error) {
          console.error('Erro ao carregar personagem:', error);
        }
      };
      loadTeam();
    }
  }, [id]);

  const handleSelectTeam = (team: ComicVineTeam) => {
    setFormData({
        comicVineId: team.id,
        aliases: team.aliases || 'N/A',
        countOfIssueAppearances: team.count_of_isssue_appearances || 0,
        countOfTeamMembers: team.count_of_team_members || 0,
        deck: team.deck || 'N/A',
        description: team.description || 'N/A',
        firstAppearedInIssue: team.first_appeared_in_issue 
            ? `${team.first_appeared_in_issue.issue_number || 'N/A'} - ${team.first_appeared_in_issue.name || 'N/A'}`
            : 'N/A',
        imageUrl: team.image?.original_url || 'N/A',
        name: team.name,
        publisherName: team.publisher?.name || 'N/A',
        siteDetailUrl: team.site_detail_url  || 'N/A'
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
        await updateTeam(parseInt(id), formData);
      } else {
        await createTeam(formData);
      }
      navigate('/teams');
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Editar Equipe' : 'Nova Equipe'}
      </Typography>

      {showSearch ? (
        <TeamSearch onSelect={handleSelectTeam} />
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
                    label="Total de Aparições"
                    name="countOfIssueAppearances"
                    value={formData.countOfIssueAppearances}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Total de Membros da Equipe"
                    name="countOfTeamMembers"
                    value={formData.countOfTeamMembers}
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