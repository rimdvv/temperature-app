import { Box, useTheme } from '@mui/material';
import React from 'react';
import ChatContainerInput from '../components/ChatContainerInput';
import ChatContainerHead from '../components/ChatContainerHead';
import ChatContainerBody from '../components/ChatContainerBody';

function ChatContainer() {
  const theme = useTheme();

  return (
    <Box
      m='0 1rem'
      sx={{
        border: 1,
        borderColor: '#D1D1D1',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        height: 'calc(100vh - 138px)',
      }}
    >
      <ChatContainerHead />
      <ChatContainerBody />
      <ChatContainerInput />
    </Box>
  );
}

export default ChatContainer;
