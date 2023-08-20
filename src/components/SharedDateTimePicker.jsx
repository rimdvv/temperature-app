import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { red } from '@mui/material/colors';

function SharedDateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs('2023-08-20T08:30')
  );

  console.log('selectedDateTime', selectedDateTime);
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
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

export default SharedDateTimePicker;
