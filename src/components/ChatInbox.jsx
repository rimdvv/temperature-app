import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function ChatInbox() {
  const [inbox, setInbox] = useState([]);
  const theme = useTheme();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  useEffect(() => {
    const getInbox = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setInbox(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInbox();
  }, [currentUser.uid]);

  // console.log('inbox to array', Object.entries(inbox));
  return (
    <Box m='0.5rem 1rem'>
      <List>
        {Object.entries(inbox)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((item) => (
            <ListItem
              key={item[0]}
              onClick={() => handleSelect(item[1].userInfo)}
              sx={{
                cursor: 'pointer',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {item[1].userInfo.displayName.charAt(0).toLocaleUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item[1].userInfo.displayName}
                secondary={item[1].lastMessage?.text}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default ChatInbox;
