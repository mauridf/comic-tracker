import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/common/Sidebar";
import Home from "./pages/Home";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { PublisherList } from './pages/publishers/PublisherList';
import { PublisherForm } from './pages/publishers/PublisherForm';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar 
          open={mobileOpen} 
          onClose={handleDrawerToggle} 
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publishers" element={<PublisherList />} />
            <Route path="/publishers/new" element={<PublisherForm />} />
            <Route path="/publishers/edit/:id" element={<PublisherForm />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;