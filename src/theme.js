import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '48px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  taskaCustom: {
    AppBarHeight: APP_BAR_HEIGHT,
    BoardBarHeight: BOARD_BAR_HEIGHT,
    BoardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#4b7bec', // màu chữ chính
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
          '*::-webkit-scrollbar':{
            width: '6px',
            height:'6px'
          },
          '*::-webkit-scrollbar-thumb':{
            backgroundColor: '#ced0da',
            borderRadius: '8px',
          },
           '*::-webkit-scrollbar-thumb:hover' :{
            backgroundColor: '#ced0da',
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
          // color: 'white',
          fontSize: '12px'
        },
      },
    },
   MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1':{
            fontSize: '12px',
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: 'white',
          fontSize: '0.8rem',
          '.MuiOutlinedInput-notchedOutline': {
            // borderColor: 'white' 
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: 'white'
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

