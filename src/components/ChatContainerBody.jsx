import React, { useContext, useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Paper,
} from '@mui/material';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function ChatContainerBody() {
  const { data } = useContext(ChatContext);
  const theme = useTheme();

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
  return (
    <Box>
      <Box
        display='flex'
        flexDirection='row-reverse'
        // alignItems='flex-start'
        sx={{ mt: 2, gap: 1.5 }}
      >
        <Avatar sx={{ width: '32px', height: '32px' }} />
        <Paper
          elevation={0}
          sx={{
            p: 2,
            maxWidth: '70%',
            backgroundColor: theme.palette.background.alt,
            borderRadius: '0px 20px 20px 20px',
          }}
        >
          <Grid container wrap='nowrap'>
            <Grid item xs>
              <Typography>
                Truncation should be conditionally applicable on this long line
                of text as this is a much longer line than what the container
                can support.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default ChatContainerBody;
