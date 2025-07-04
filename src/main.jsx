import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CssVarsProvider theme={theme} attribute="data-mui-color-scheme" >
      <CssBaseline />
      <App />
    </CssVarsProvider>

  // </StrictMode>,
)
