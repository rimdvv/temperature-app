import React, { useState } from 'react';
import { Box, Input, TextField, Typography, useTheme } from '@mui/material';
import { Label } from '@mui/icons-material';

function SharedInput(props) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Box>
      <Label>{label}</Label>
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
      />
      <Typography>{focused && errorMessage}</Typography>
    </Box>
  );
}

export default SharedInput;
