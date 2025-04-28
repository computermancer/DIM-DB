import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Movements', path: '/movements' },
    { label: 'Clients', path: '/clients' }
  ];

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: 'white', 
      boxShadow: 'none', 
      borderBottom: '1px solid #e0e0e0',
      height: '64px'
    }}>
      <Toolbar sx={{ 
        minHeight: '64px',
        padding: '0 24px'
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          width: '100%', 
          justifyContent: 'center'
        }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="touch-target"
              sx={{
                color: 'primary.main',
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                },
                fontSize: '1rem',
                padding: '6px 16px',
                minWidth: '120px',
                minHeight: '44px',
                flex: 1,
                maxWidth: '200px'
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
