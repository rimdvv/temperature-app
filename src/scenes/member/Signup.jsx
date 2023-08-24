import { useState } from 'react';
import {
  Box,
  Input,
  TextField,
  Typography,
  useTheme,
  Button,
  FormControl,
} from '@mui/material';
import SharedInput from '../../components/SharedInput';

const Signup = () => {
  const [values, setValues] = useState({
    username: 'hey',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address',
      label: 'Email',
      required: true,
    },

    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Password doesn't match",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <div>dho</div>
      <SharedInput />
      {inputs.map((item) => {
        <SharedInput
          key={item.id}
          value={values[item.name]}
          onChange={onChange}
          {...item}
        />;
      })}
      <Button>Sign up</Button>
    </Box>
  );
};

export default Signup;
