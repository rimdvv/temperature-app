import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, useTheme } from '@mui/material';

function SharedDateTimePicker({ onChange, value }) {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      marginTop='3rem'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            value={value}
            onChange={onChange}
            sx={{
              backgroundColor: theme.palette.background.alt,
              padding: '1rem 1.5rem',
              borderRadius: '32px',
            }}
            slotProps={{
              textField: {
                variant: 'standard',
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

export default SharedDateTimePicker;
