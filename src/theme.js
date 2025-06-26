import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
  taskaCustom: {
    appBarHeight: '58px',
    boorBarHeight: '40px'
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
          textTransform: 'none',
          borderWidth:'0.5px',
          '&:hover':{
            borderWidth:'0.5px'
          }
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
            backgroundColor: 'gray',
            borderRadius: '8px',
          },
           '& *::-webkit-scrollbar-thumb:hover' :{
            backgroundColor: 'red',
            borderRadius: '8px',
            cursor:'pointer'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'white',
          fontSize: '12px'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: 'white',
          fontSize: '0.8rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            },
            '& fieldset': {
              color: 'white',
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

