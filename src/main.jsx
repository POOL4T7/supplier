import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './bootstrap.css';
import App from './App.jsx';
import Header from './components/layout/Header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Header />
      <App />
    </>
  </StrictMode>
);
