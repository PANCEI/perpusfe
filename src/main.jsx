import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import Provider baru kita
//import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
/**
 * Fungsi

Membagikan Redux Store ke seluruh aplikasi React.
 */
import { PersistGate } from 'redux-persist/integration/react'
/**
 * Fungsi

Menunggu proses REHYDRATE selesai sebelum React merender aplikasi.
 */
import {store, persistor} from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Bungkus App dengan Provider dan masukkan properti store */}
    <Provider store={store}>
      {/* 4. Bungkus dengan PersistGate agar data dari sessionStorage aman saat refresh */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
