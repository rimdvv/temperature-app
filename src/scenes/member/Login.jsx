import { useState } from 'react';
import { Box, TextField, Typography, useTheme, Button } from '@mui/material';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  console.log('values', values);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        marginTop='2rem'
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          marginTop='2rem'
        >
          <img src={logo} alt='logo' height='56px' width='56px' />
          <Typography
            variant='h1'
            sx={{
              fontWeight: 'bold',
              marginLeft: '1rem',
            }}
          >
            Tempo
          </Typography>
        </Box>
        <Box
          component='form'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          marginTop='4rem'
          gap='1rem'
        >
          <TextField
            variant='standard'
            name='email'
            type='email'
            value={values.email}
            onChange={(e) => {
              onChange(e);
            }}
            label='Email'
            required
            fullWidth
            sx={{
              '& .MuiFormLabel-asterisk': {
                display: 'none',
              },
              '& .MuiFormHelperText-root': {
                maxWidth: '300px',
                color: theme.palette.secondary.alt,
              },
            }}
          />
          <TextField
            variant='standard'
            name='password'
            type='password'
            value={values.password}
            onChange={(e) => {
              onChange(e);
            }}
            label='Password'
            required
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            sx={{
              '& .MuiFormLabel-asterisk': {
                display: 'none',
              },
              '& .MuiFormHelperText-root': {
                maxWidth: '300px',
                color: theme.palette.secondary.alt,
              },
            }}
          />
          <Box>
            <Button
              // onClick={onClick}
              sx={{
                padding: '0.5rem 2rem',
                marginTop: '3rem',
                borderRadius: '24px',
                boxShadow: 2,
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: theme.palette.secondary.alt,
                width: '300px',
                height: '44px',
              }}
              variant='contained'
            >
              Log in
            </Button>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              marginTop='2rem'
              gap='0.5rem'
            >
              <Typography fontSize='13px'>Don't have an Account? </Typography>
              <Typography
                onClick={() => navigate('/signup')}
                fontSize='14px'
                fontWeight='bold'
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign up
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
