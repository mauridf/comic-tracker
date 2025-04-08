import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import ArticleIcon from '@mui/icons-material/Article';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Editoras (Publishers)', icon: <MenuBookIcon />, path: '/publishers' },
    { text: 'Personagens (Characters)', icon:<PersonIcon />, path: '/characters' },
    { text: 'Equipes (Teams)', icon:<GroupsIcon />, path: '/teams'},
    { text: 'HQs (Volumes)', icon:<LibraryBooksIcon />, path: '/volumes'},
    // { text: 'Edições (Issues)', icon:<ArticleIcon />, path: '/issues'},
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};