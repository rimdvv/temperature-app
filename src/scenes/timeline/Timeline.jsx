import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useEffect } from 'react';
import { db } from '../../firebase';

function TimelineTotal() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'temperature'));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        // console.log('dateeee', data[0].time.toDate());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h3' fontWeight='bold'>
          Temperature Timeline
        </Typography>
      </Box>
      <Timeline>
        {data.map((item) => {
          // const formattedDate = item.time.toDate();
          return (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align='right'
                variant='body2'
                color='text.secondary'
              >
                <Typography variant='h6' component='span'>
                  {new Date(item.time.seconds * 1000).toLocaleDateString(
                    'en-US'
                  )}
                </Typography>
                <Typography>
                  {new Date(item.time.seconds * 1000).toLocaleTimeString(
                    'en-US'
                  )}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <FastfoodIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant='h6' component='span'>
                  temp
                </Typography>
                <Typography>{item.temperature}°C</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}

export default TimelineTotal;
