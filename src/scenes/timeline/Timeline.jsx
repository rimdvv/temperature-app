import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import medlogo from '../../assets/medlogo.svg';
import templogo from '../../assets/templogo.svg';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function TimelineTotal() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let listTemp = [];
      let listMed = [];
      try {
        const querySnapshot1 = await getDocs(collection(db, 'temperature'));
        querySnapshot1.forEach((doc) => {
          listTemp.push({ id: doc.id, ...doc.data() });
        });
        const querySnapshot2 = await getDocs(collection(db, 'medicine'));
        querySnapshot2.forEach((doc) => {
          listMed.push({ id: doc.id, ...doc.data() });
        });
        const listTimeline = listTemp.concat(listMed);
        const sortedTimeline = Object.values(listTimeline).sort(
          (a, b) => b.time - a.time
        );
        setData(sortedTimeline);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (item) => {
    if (item.type === 'temperature') {
      navigate(`/temperature/update/${item.id}`);
    } else {
      navigate(`/medicine/update/${item.id}`);
    }
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h3' fontWeight='bold'>
          Timeline
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection={isAboveMediumScreens ? 'row' : 'column'}
        alignItems='center'
        justifyContent='center'
        marginTop='1rem'
      >
        <Typography
          fontSize='13px'
          sx={{
            backgroundColor: theme.palette.background.alt,
            padding: '4px 8px',
            borderRadius: '16px',
            marginBottom: '4px',
            marginRight: '4px',
          }}
        >
          수정 혹은 삭제를 원할 경우, 해당 부분을 클릭하세요
        </Typography>
      </Box>
      <Timeline>
        {data.map((item) => {
          return (
            <TimelineItem key={item.id} onClick={() => handleEdit(item)}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align='right'
                variant='body2'
                color='text.secondary'
              >
                <Typography fontSize='12px' component='span'>
                  {new Date(item.time.seconds * 1000).toLocaleDateString([], {
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Typography>
                <Typography fontSize='13px'>
                  {new Date(item.time.seconds * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  sx={{
                    backgroundColor: 'transparent',
                    padding: '0px',
                    boxShadow: 'none',
                  }}
                >
                  <img
                    src={`${item.type === 'temperature' ? templogo : medlogo}`}
                    alt=''
                  />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography sx={{ marginTop: '16px', fontWeight: 'medium' }}>
                  {`${
                    item.type === 'medicine' && item.value === 'Acetaminophen'
                      ? 'aap'
                      : item.type === 'medicine' && item.value === 'Ibuprofen'
                      ? 'ibu'
                      : item.type === 'medicine' &&
                        item.value === 'Dexibuprofen'
                      ? 'dex'
                      : ''
                  }`}
                  {`${item.type === 'temperature' ? item.value : ''}`}
                  <Typography variant='span' sx={{ marginLeft: '4px' }}>
                    {item.dosage}
                  </Typography>
                  <Typography
                    variant='span'
                    sx={{
                      color: 'text.secondary',
                      fontSize: '14px',
                      marginLeft: '4px',
                    }}
                  >
                    {`${item.type === `temperature` ? '°C' : 'ml'}`}
                  </Typography>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}

export default TimelineTotal;
