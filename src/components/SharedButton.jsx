import React from 'react';
import { Button, Box } from '@mui/material';
import { useTheme } from '@emotion/react';

function SharedButton({ text, onClick }) {
  const theme = useTheme();
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Button
        onClick={onClick}
        sx={{
          padding: '0.5rem 2rem',
          margin: '4rem 0',
          borderRadius: '16px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: theme.palette.secondary.alt,
        }}
        variant='contained'
      >
        {text}
      </Button>
    </Box>
  );
}

export default SharedButton;
