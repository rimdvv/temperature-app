import { Box, Divider, TextField, Typography } from '@mui/material';
import React from 'react';

function ChatContainerInput() {
  return (
    <Box
      display='flex'
      alignItems='center'
      // justifyContent='center'
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <TextField
        // fullWidth
        size='small'
        placeholder='Type Message..'
        variant='outlined'
        sx={{ margin: '1rem 0', width: '70%' }}
      />

      <Typography>Send</Typography>
    </Box>
  );
}

export default ChatContainerInput;
