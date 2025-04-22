import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'styles/styles.scss';
import App from './App/App';
import 'config/configureMobx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={'/hw-3/'}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
