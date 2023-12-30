import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer style={{ zIndex: 10001 }} />
      <App />
    </ThemeProvider>
  </Provider>
);

