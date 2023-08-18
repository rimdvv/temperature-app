import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  Button,
  Box,
  Typography,
  Stack,
  Slider,
  useTheme,
} from '@mui/material';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function TempForm() {
  const theme = useTheme();
  const navigate = useNavigate();

  const tempMin = 34;
  const tempMax = 41;
  const [tempValue, setTempValue] = useState(37);

  const handleTempValue = (e) => {
    setTempValue(e.target.value);
  };
  const handleSubmitTempValue = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'temperature'), {
        temperature: tempValue,
        timestamp: serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    navigate('/');
  };
  console.log(tempValue);

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h3' fontWeight='bold'>
          Temperature
        </Typography>
      </Box>
      <Box
        mt='3rem'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Stack sx={{ height: 360 }}>
          <Slider
            aria-label='Temperature'
            orientation='vertical'
            step={0.1}
            value={tempValue}
            onChange={handleTempValue}
            valueLabelDisplay='on'
            min={tempMin}
            max={tempMax}
            sx={{
              color: '#F55F4B',
              width: 12,
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#F55F4B',
                marginRight: '0.5rem',
              },
              '& .MuiSlider-markLabel': {
                marginLeft: '0.5rem',
              },
            }}
          />
        </Stack>
        <Box mt='2rem'>
          <Typography variant='h4' fontWeight='bold'>
            {tempValue}°C
          </Typography>
        </Box>
        <Button
          onClick={handleSubmitTempValue}
          sx={{
            padding: '0.5rem 2rem',
            mt: '4rem',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#535EE9',
          }}
          variant='contained'
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default TempForm;
