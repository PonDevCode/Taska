import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme.js'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// cấu hình mui dialog
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CssVarsProvider theme={theme} attribute="data-mui-color-scheme" >
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      dialogProps: { maxWidth: 'xs' },
      buttonOrder: ["confirm", "cancel"],
      cancellationButtonProps:{color : 'inherit'},
      confirmationButtonProps:{color: 'secondary',variant:'outlined'}
    }}>
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ConfirmProvider>
  </CssVarsProvider>
  // </StrictMode>,
)
