import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function ChatInbox() {
  const [inbox, setInbox] = useState([]);

  const { currentUser } = useContext(AuthContext);

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
  // console.log('inbox', inbox);
  // console.log('inbox to array', Object.entries(inbox));
  return (
    <Box m='0.5rem 1rem'>
      <List>
        {Object.entries(inbox)?.map((item) => (
          <ListItem key={item[0]}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={item[1].userInfo.displayName}
              secondary='Leave a message'
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ChatInbox;
