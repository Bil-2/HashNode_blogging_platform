import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context/AuthProvider.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
axios.defaults.timeout = 15000; // 15 second timeout to prevent infinite UI hangs

// Global interceptor for handling 401 Unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local auth state
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      // Only redirect if we're not already on the auth page to prevent redirect loops
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);