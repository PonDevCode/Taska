
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import App from './App.jsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme.js'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// cấu hình mui dialog
import { ConfirmProvider } from "material-ui-confirm";

// cấu hình redux
import { store } from './redux/Store.js'
import { Provider } from 'react-redux'

// cấu hình react router dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

// cấu hình Redux - persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const persistor = persistStore(store)

// kỹ thuật inject-store : là kỹ thuật khi cần sử dụng biến redux store ở các files ngoài phạm vi components
import { injectStore } from './utils/authozieAxios.js';
injectStore(store)
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme} attribute="data-mui-color-scheme" >
          <ConfirmProvider defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            buttonOrder: ["confirm", "cancel"],
            cancellationButtonProps: { color: 'inherit' },
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
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
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>,
)
