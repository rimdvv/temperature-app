import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { ChatContext } from '../context/ChatContext';

function ChatContainerHead() {
  const { data } = useContext(ChatContext);
  console.log('datachatcontainer', data);
  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='center' mb='1rem'>
        <Avatar sx={{ width: 28, height: 28 }}>
          {data?.user.displayName?.charAt(0).toLocaleUpperCase()}
        </Avatar>
        <Typography fontSize='16px' fontWeight='medium' sx={{ ml: 1.5 }}>
          {data?.user.displayName}
        </Typography>
      </Box>
      <Divider style={{ width: '100%' }} />
    </Box>
  );
}

export default ChatContainerHead;
