import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  useTheme,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Send, PhotoCameraOutlined } from '@mui/icons-material';

import React from 'react';

function ChatContainerInput() {
  const theme = useTheme();
  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <TextField
          fullWidth
          size='small'
          placeholder='Type Message..'
          variant='outlined'
          sx={{ margin: '1rem 0' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.alt,
                    width: '32px',
                    height: '32px',
                    mr: 2,
                  }}
                ></Box>
                <PhotoCameraOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant='contained'
          sx={{ backgroundColor: theme.palette.secondary.alt, ml: 2 }}
          endIcon={<Send />}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatContainerInput;
