import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
  taskaCustom: {
    appBarHeight: '68px',
    boorBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#00FA9A', // màu chữ chính
        },
        secondary: {
          main: '#7388C1', // màu nền
        },

      }
    },
    dark: {
      palette: {
        primary: {
          main: '#ffffff', // màu chữ chính
        },
        secondary: {
          main: '#1d2125', // màu nền
        },

      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-primary-main)'
        }
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
           overflowY: 'hidden', 
          '& *::-webkit-scrollbar':{
            with: '8px',
            height:'8px'
          },
          '& *::-webkit-scrollbar-thumb':{
            backgroundColor: 'red',
            borderRadius: '8px',
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'var(--mui-palette-primary-main)',
          fontSize: '12px'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-primary-main)',
          fontSize: '0.8rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)'
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-primary-main)'
            },

            '& fieldset': {
              color: 'var(--mui-palette-primary-main)',
              borderWidth: '1px !important'
            }

          }
        }
      }
    }
  },

  colorSchemeSelector: 'data',
});

export default theme;

