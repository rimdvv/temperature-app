import React, { useState, useEffect } from 'react';
import { updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import acetaminophen from '../../assets/acetaminophen.svg';
import dexibuprofen from '../../assets/dexibuprofen.svg';
import ibuprofen from '../../assets/ibuprofen.svg';
import SharedButton from '../../components/SharedButton';
import MedTypeBox from '../../components/MedTypeBox';
import SharedDateTimePicker from '../../components/SharedDateTimePicker';
import dayjs from 'dayjs';
import { theme } from '../../theme';

function EditMedForm() {
  const { doc_id } = useParams();
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrevData = async () => {
      try {
        const data = await getDoc(doc(db, 'medicine', doc_id));
        const prevData = data.data();
        // console.log('prevData', prevData);
        setValues({
          time: dayjs(new Date(prevData.time.seconds * 1000)).$d,
          medType: prevData.value,
          dosage: prevData.dosage,
        });
        setSelectedDateTime(dayjs(new Date(prevData.time.seconds * 1000)));
        setActive(prevData.value);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrevData();
  }, []);

  const [values, setValues] = useState({
    time: null,
    medType: '',
    dosage: '',
  });
  // console.log('values', values);
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
        const docRef = await updateDoc(doc(db, 'medicine', doc_id), {
          type: 'medicine',
          time: values.time,
          value: values.medType,
          dosage: values.dosage,
        });
        console.log('successfully edited');
        navigate('/');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'medicine', doc_id));
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
                value={values.dosage}
                endAdornment={
                  <InputAdornment position='end'>ml</InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        gap='2rem'
        justifyContent='center'
        alignItems='center'
      >
        <SharedButton onClick={onSubmitHandler} text='Save' />
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
  );
}

export default EditMedForm;
