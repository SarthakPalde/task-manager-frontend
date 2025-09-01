import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold',fontFamily: 'Arial, sans-serif'   }}>
            Task Manager
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
