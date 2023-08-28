import React from 'react';
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

function ChatContainerHead() {
  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='center' mb='1rem'>
        <Avatar
          sx={{ width: 28, height: 28 }}
          alt=''
          src='https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb2ZpbGV8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=800&q=60'
        />
        <Typography fontSize='15px' fontWeight='medium' sx={{ ml: 1.5 }}>
          Dr.Benson
        </Typography>
      </Box>
      <Divider style={{ width: '100%' }} />
    </Box>
  );
}

export default ChatContainerHead;
