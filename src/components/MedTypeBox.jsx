import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

function MedTypeBox({ text, handleMedType, active, image }) {
  const lcText = text.toLowerCase();
  const theme = useTheme();

  return (
    <Box
      gridColumn='span 4'
      gridRow='span 1'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      p='1rem 1rem'
      flex='1 1 100%'
      backgroundColor={theme.palette.background.alt}
      borderRadius='0.55rem'
      onClick={() => handleMedType(lcText)}
      sx={{
        border: active === lcText ? 1 : 0,
        borderColor:
          active === lcText ? theme.palette.secondary.alt : undefined,
      }}
    >
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography fontWeight='medium'>{text}</Typography>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <img src={image} alt={image} />
      </Box>
    </Box>
  );
}

export default MedTypeBox;
