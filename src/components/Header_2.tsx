import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Button } from '@mui/material';
import { Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { styled, alpha} from '@mui/system';
import logo from '../assets/images/logo.png';
import LoginForm from './Auth/LoginForm';

// Style pour la recherche
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#fff', 0.15), // Utilisation de la couleur blanche
  '&:hover': {
    backgroundColor: alpha('#fff', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// Composant Header
const Header_2: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showLogin, setShowLogin] = useState(false);
  
  // Fonction pour formater l'heure en UTC
  const updateClock = () => {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4]; // Récupère l'heure en UTC format HH:MM:SS
    setCurrentTime(timeString);
  };

  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000); // Met à jour l'heure toutes les secondes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <AppBar 
      position="fixed" // Position fixée en haut de l'écran
      sx={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))', // Dégradé allant du noir au transparent
        zIndex: 1300, // S'assurer que l'AppBar est au-dessus des autres éléments
        width: '100%',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: 2 }}>
            <img src={logo} width="50px" alt="" />
          </Typography>
          <Button color="inherit">FlyWatchs</Button>
        </Box>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Find flights, airports and more"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: 2 }}>
           {currentTime} UTC
          </Typography>
          <IconButton color="inherit" sx={{ marginRight: 2 }} onClick={() => setShowLogin(true)}>
            <AccountCircleIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>Login</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
};

export default Header_2;
