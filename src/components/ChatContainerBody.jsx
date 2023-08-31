import React, { useContext, useState, useEffect, useRef } from 'react';
import { Avatar, Box, Grid, useTheme, Typography, Paper } from '@mui/material';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import nomessages from '../assets/nomessages.svg';

function ChatContainerBody() {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();

  const ref = useRef();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, 'AllChats', data.chatId), (doc) => {
        setMessages(doc.data());
      });
      return () => {
        unsub();
      };
    };
    data.chatId && getMessages();
  }, [data.chatId]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // console.log('messages', messages);
  // console.log('currentUser', currentUser);
  // console.log('data', data);
  return (
    <Box
      sx={{
        height: 'calc(100% - 100px)',
        overflow: 'scroll',
      }}
    >
      {messages?.messages?.map((m) => (
        <Box
          display='flex'
          flexDirection={currentUser.uid !== m.senderId ? 'row' : 'row-reverse'}
          alignItems='flex-start'
          sx={{ mt: 1.5, gap: 1.5 }}
          key={m.id}
          ref={ref}
        >
          {currentUser.uid !== m.senderId && (
            <Avatar sx={{ width: '32px', height: '32px' }}>
              {data?.user.displayName?.charAt(0).toLocaleUpperCase()}
            </Avatar>
          )}
          <Paper
            elevation={0}
            sx={{
              padding: '8px 16px',
              maxWidth: '70%',
              backgroundColor: '#F1F1F1',
              borderRadius:
                currentUser.uid !== m.senderId
                  ? `0px 8px 8px 8px`
                  : `8px 0px 8px 8px`,
            }}
          >
            <Grid container wrap='nowrap'>
              <Grid item xs>
                {m.img && (
                  <img
                    src={m.img}
                    alt=''
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                    }}
                  />
                )}
                <Typography fontSize='15px'>{m.text}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
      {messages.length === 0 && (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{ mt: 20 }}
        >
          <img src={nomessages} alt='' />
        </Box>
      )}
    </Box>
  );
}

export default ChatContainerBody;
