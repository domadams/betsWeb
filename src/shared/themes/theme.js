import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Titillium Web',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#006699',
    },
    secondary: {
      main: '#1a5e80',
    },
    error: {
      main: '#A40',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
