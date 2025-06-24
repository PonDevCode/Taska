
import { cyan, deepOrange, lightBlue, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  taskaCustom: {
    appBarHeight : '48px',
    boorBarHeight : '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      },

    },
    dark: {
      palette: {
        primary: lightBlue,
        secondary: cyan,
      },

    },
  },
  colorSchemeSelector: 'data',
});

export default theme;

