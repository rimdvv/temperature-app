import { Box } from '@mui/material';
import React from 'react';
import ChatInbox from './ChatInbox';
import CreateChat from './CreateChat';

function ChatSidebar() {
  return (
    <Box>
      <CreateChat />
      <ChatInbox />
    </Box>
  );
}

export default ChatSidebar;
