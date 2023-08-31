import { Box } from '@mui/material';
import React from 'react';
import ChatContainer from '../../components/ChatContainer';
import ChatSidebar from '../../components/ChatSidebar';

function Chat() {
  return (
    <Box display='flex' m='1.5rem 2.5rem'>
      <Box width='360px'>
        <ChatSidebar />
      </Box>
      <Box flexGrow={1}>
        <ChatContainer />
      </Box>
      {/* <Box sx={{ width: 1 / 3 }}>
        <ChatSidebar />
      </Box> */}
      {/* <Box sx={{ width: 2 / 3 }}>
        <ChatContainer />
      </Box> */}
    </Box>
  );
}

export default Chat;
