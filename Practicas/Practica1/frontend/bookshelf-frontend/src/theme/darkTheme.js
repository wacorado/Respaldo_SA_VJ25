import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#bb86fc' },
    secondary: { main: '#03dac6' },
    background: { default: '#121212', paper: '#1e1e1e' },
    error: { main: '#cf6679' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
export default darkTheme;
