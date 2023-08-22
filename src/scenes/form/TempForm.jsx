import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { Box, Typography, Stack, Slider, useTheme } from '@mui/material';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import SharedButton from '../../components/SharedButton';
import SharedDateTimePicker from '../../components/SharedDateTimePicker';

function TempForm() {
  const theme = useTheme();
  const navigate = useNavigate();

  const tempMin = 34;
  const tempMax = 41;
  const [values, setValues] = useState({
    temp: 37,
    time: '',
  });

  // console.log('values', values);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleTempValue = (e) => {
    setValues({ ...values, temp: e.target.value });
  };

  const handleDateTime = (newValue) => {
    setSelectedDateTime(newValue);
    setValues({ ...values, time: newValue.$d });
  };

  const handleSubmitTempValue = async (e) => {
    if (values.time === '') {
      e.preventDefault();
      alert('Select the time and date when the temperature was taken😊');
      return;
    }
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'temperature'), {
        type: 'temperature',
        time: values.time,
        value: values.temp,
      });
      console.log('Document written with ID: ', docRef.id);
      navigate('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h3' fontWeight='bold'>
          Temperature
        </Typography>
      </Box>
      <SharedDateTimePicker
        onChange={handleDateTime}
        value={selectedDateTime}
      />
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
            value={values.temp}
            onChange={handleTempValue}
            valueLabelDisplay='on'
            min={tempMin}
            max={tempMax}
            sx={{
              color: theme.palette.primary.alt,
              width: 12,
              '& .MuiSlider-valueLabel': {
                backgroundColor: theme.palette.primary.alt,
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
            {values.temp}°C
          </Typography>
        </Box>
        <SharedButton onClick={handleSubmitTempValue} text='Save' />
      </Box>
    </Box>
  );
}

export default TempForm;
