import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      alt: '#F55F4B',
    },
    secondary: {
      main: '#58C187',
      alt: '#535EE9',
    },
    neutral: {
      main: '#17345C',
    },
    background: {
      default: '#ffffff',
      alt: '#F8F7F4',
    },
  },
  typography: {
    fontFamily: ['DM Sans', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
      fontFamily: ['DM Sans', 'sans-serif'].join(','),
      fontSize: 40,
    },
    h2: {
      fontFamily: ['DM Sans', 'sans-serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['DM Sans', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['DM Sans', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['DM Sans', 'sans-serif'].join(','),
      fontSize: 16,
    },
  },
});
