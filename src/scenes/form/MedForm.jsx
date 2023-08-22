import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  FormControl,
  Input,
  InputAdornment,
} from '@mui/material';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import acetaminophen from '../../assets/acetaminophen.svg';
import dexibuprofen from '../../assets/dexibuprofen.svg';
import ibuprofen from '../../assets/ibuprofen.svg';
import SharedButton from '../../components/SharedButton';
import MedTypeBox from '../../components/MedTypeBox';
import SharedDateTimePicker from '../../components/SharedDateTimePicker';

function MedForm() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const theme = useTheme();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    time: '',
    medType: '',
    dosage: 0,
  });

  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [active, setActive] = useState('');

  const handleMedType = (text) => {
    setActive(text);
    setValues({ ...values, medType: text });
  };

  const handleDosage = (e) => {
    setValues({ ...values, dosage: parseFloat(e.target.value) });
  };

  const handleDateTime = (newValue) => {
    setSelectedDateTime(newValue);
    setValues({ ...values, time: newValue.$d });
  };

  const onSubmitHandler = async (e) => {
    if (values.medType.trim().length === 0) {
      e.preventDefault();
      alert('Select the medication😊');
      return;
    } else if (values.dosage === 0 || isNaN(values.dosage)) {
      e.preventDefault();
      alert('Enter the given dose😊');
      return;
    } else if (values.time === '') {
      e.preventDefault();
      alert('Select the time and date when the medication was given😊');
      return;
    } else {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, 'medicine'), {
          type: 'medicine',
          time: values.time,
          value: values.medType,
          dosage: values.dosage,
        });
        console.log('Document written with ID: ', docRef.id);
        navigate('/');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h3' fontWeight='bold'>
          Medicine
        </Typography>
      </Box>
      <SharedDateTimePicker
        onChange={handleDateTime}
        value={selectedDateTime}
      />
      <Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          mt='4rem'
        >
          <Typography variant='h6' fontWeight='bold'>
            Select the medication
          </Typography>
        </Box>
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gridAutoRows='160px'
          gap='20px'
          sx={{
            '& > div': {
              gridColumn: isAboveMediumScreens ? undefined : 'span 12',
            },
          }}
        >
          <MedTypeBox
            text='Acetaminophen'
            active={active}
            handleMedType={handleMedType}
            image={acetaminophen}
          />
          <MedTypeBox
            text='Ibuprofen'
            active={active}
            handleMedType={handleMedType}
            image={ibuprofen}
          />
          <MedTypeBox
            text='Dexibuprofen'
            active={active}
            handleMedType={handleMedType}
            image={dexibuprofen}
          />
        </Box>
      </Box>
      <Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          mt='3rem'
        >
          <Typography variant='h6' fontWeight='bold'>
            Enter the given dose
          </Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <FormControl variant='standard' sx={{ m: 1, mt: 3, width: '20ch' }}>
              <Input
                type='number'
                onChange={handleDosage}
                endAdornment={
                  <InputAdornment position='end'>ml</InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <SharedButton onClick={onSubmitHandler} text='Save' />
    </Box>
  );
}

export default MedForm;
