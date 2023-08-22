import React, { useState, useEffect } from 'react';
import { updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  Stack,
  Slider,
  useTheme,
  Button,
} from '@mui/material';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import SharedButton from '../../components/SharedButton';
import SharedDateTimePicker from '../../components/SharedDateTimePicker';
import dayjs from 'dayjs';

function EditTempForm() {
  const { doc_id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrevData = async () => {
      try {
        const data = await getDoc(doc(db, 'temperature', doc_id));
        const prevData = data.data();
        // console.log('prevData', prevData);
        setValues({
          temp: prevData.value,
          time: dayjs(new Date(prevData.time.seconds * 1000)).$d,
        });
        setSelectedDateTime(dayjs(new Date(prevData.time.seconds * 1000)));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrevData();
  }, []);

  const tempMin = 34;
  const tempMax = 41;
  const [values, setValues] = useState({
    temp: null,
    time: '',
  });
  //   console.log('values', values);
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
      const docRef = await updateDoc(doc(db, 'temperature', doc_id), {
        type: 'temperature',
        time: values.time,
        value: values.temp,
      });
      console.log('successfully updated');
      navigate('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'temperature', doc_id));
      console.log('successfully deleted');
      navigate('/');
    } catch (err) {
      console.log(err);
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
        <Box
          display='flex'
          gap='2rem'
          justifyContent='center'
          alignItems='center'
        >
          <SharedButton onClick={handleSubmitTempValue} text='Save' />
          <Button
            onClick={handleDelete}
            sx={{
              padding: '0.5rem 2rem',
              margin: '4rem 0',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: theme.palette.neutral.main,
            }}
            variant='contained'
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditTempForm;
