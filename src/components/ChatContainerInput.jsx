import { Box, Divider, TextField, Typography } from '@mui/material';
import React from 'react';

function ChatContainerInput() {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Box sx={{ width: '400px' }}>
        <TextField
          fullWidth
          width='240px'
          size='small'
          placeholder='Type Message..'
          variant='outlined'
          sx={{ margin: '1rem 0' }}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography>Send</Typography>
      </Box>
    </Box>
  );
}

export default ChatContainerInput;
