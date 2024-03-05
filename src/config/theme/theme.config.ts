import { createTheme } from '@mui/material/styles';

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B4978', // Set your primary color here
    },
    // You can customize other colors as needed
    secondary: {
      main: '#CFB885',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: ['Fredoka'].join(','),
  },
});

export default theme;
