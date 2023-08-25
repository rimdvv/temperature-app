import { useState } from 'react';
import { Box, TextField, Typography, useTheme, Button } from '@mui/material';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  console.log('values', values);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkUsername = (e) => {
    const reg = new RegExp('^[A-Za-z0-9]{3,16}$');
    setIsUsernameValid(reg.test(e.target.value));
  };
  const checkEmail = (e) => {
    const reg = new RegExp(
      '^[^W_]+w*(?:[.-]w*)*[^W_]+@[^W_]+(?:[.-]?w*[^W_]+)*(?:.[^W_]{2,})$'
    );
    setIsEmailValid(reg.test(e.target.value));
  };
  const checkPassword = (e) => {
    const reg = new RegExp(
      '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
    );
    setIsPasswordValid(reg.test(e.target.value));
  };
  const checkConfirmPassword = (e) => {
    if (e.target.value !== values.password) {
      setIsConfirmPasswordValid(false);
    } else {
      setIsConfirmPasswordValid(true);
    }
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
            name='username'
            type='text'
            value={values.username}
            onChange={(e) => {
              onChange(e);
              checkUsername(e);
            }}
            label='Username'
            helperText={
              isUsernameValid
                ? ''
                : 'Username should be 3-16 characters and should not include any special character'
            }
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
            name='email'
            type='email'
            value={values.email}
            onChange={(e) => {
              onChange(e);
              checkEmail(e);
            }}
            label='Email'
            helperText={
              isEmailValid ? '' : 'It should be a valid email address'
            }
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
              checkPassword(e);
            }}
            label='Password'
            helperText={
              isPasswordValid
                ? ''
                : 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character'
            }
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
          <TextField
            variant='standard'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
            onChange={(e) => {
              onChange(e);
              checkConfirmPassword(e);
            }}
            label='Confirm Password'
            helperText={isConfirmPasswordValid ? '' : 'Password does not match'}
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
              Sign up
            </Button>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              marginTop='2rem'
              gap='0.5rem'
            >
              <Typography fontSize='13px'>Already have an Account? </Typography>
              <Typography
                onClick={() => navigate('/login')}
                fontSize='14px'
                fontWeight='bold'
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Log in
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
